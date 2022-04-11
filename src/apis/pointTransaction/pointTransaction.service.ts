import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async checkDuplicate({ impUid }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const result = await this.pointTransactionRepository.findOne(
        { impUid },
        { lock: { mode: 'pessimistic_write' } },
      );
      if (result) throw new ConflictException('이미 결제되었습니다');
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async checkAlreadyCanceled({ impUid }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (pointTransaction) throw new ConflictException();
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!pointTransaction)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    const user = await this.userRepository.findOne({ id: currentUser.id });
    if (user.point < pointTransaction.amount)
      throw new UnprocessableEntityException('포인트 부족');
  }

  async cancel({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const pointTransaction = await this.create({
        impUid,
        amount: -amount,
        currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });
      await queryRunner.manager.save(pointTransaction);
      await queryRunner.commitTransaction();
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }) {
    //크리에이트에 락 걸기
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      //1. pointTransaction테이블에 거래기록 생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status,
      });
      // await this.pointTransactionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);
      //2. 유저 정보 조회
      const user = await queryRunner.manager.findOne(User, {
        id: currentUser.id,
      });
      // await this.userRepository.findOne({ id: currentUser.id });
      console.log(user);

      //3. 유저의 돈 업데이트
      const newUser = await this.userRepository.create({
        id: user.id,
        point: user.point + amount,
      });
      //4. 최종결과 돌려주기

      await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
