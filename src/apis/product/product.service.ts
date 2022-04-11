import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergy } from '../allergy/entities/allergy.entity';
import { ProductSubCategory } from '../subCategory/entities/productSubCategory.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { updateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

interface ICreate {
  createProductInput: CreateProductInput;
}

interface IFindOne {
  productId: string;
}

interface IUpdate {
  productId: string;
  updateProductInput: updateProductInput;
}

//비즈니스 로직
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSubCategory)
    private readonly productSubCategoryRepository: Repository<ProductSubCategory>,

    @InjectRepository(Allergy)
    private readonly productAllergyRepository: Repository<Allergy>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.productRepository.find({
      withDeleted: true,
      relations: ['productSubCategory', 'productAllergy'],
    });
    return resultOfAllProducts;
    // return await this.productRepository.find();
  }
  //{productId}:{productId:string}
  async findOne({ productId }: IFindOne) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSubCategory', 'productAllergy'],
    });
  }

  async create({ createProductInput }: ICreate) {
    const { productSubCategoryId, productAllergy, ...product } =
      createProductInput;
    const result = await this.productSubCategoryRepository.findOne({
      id: productSubCategoryId,
    });

    const result2 = [];
    for (let i = 0; i < productAllergy.length; i++) {
      const allergyname = productAllergy[i];
      const prevAllergy = await this.productAllergyRepository.findOne({
        name: allergyname,
      });
      if (prevAllergy) {
        result2.push(prevAllergy);
      } else {
        const newAllergy = await this.productAllergyRepository.save({
          name: allergyname,
        });
        result2.push(newAllergy);
      }
    }

    const result3 = await this.productRepository.save({
      productSubCategory: result,
      productAllergy: result2,
      ...product,
    });
    return result3;
  }

  async update({ productId, updateProductInput }: IUpdate) {
    const product = await this.productRepository.findOne({
      id: productId,
    });
    const newProduct = {
      ...product,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
    //save는 수정도 되고 등록도 됨, 업데이트 내용을 프론트에 반환하려면 save로 update역할을 시킴
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({
      id: productId,
    }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const result = await this.productRepository.restore({
      id: productId,
    });
    return result.affected ? true : false;
  }
}
