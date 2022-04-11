import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Image } from './entities/image.entity';
import { Product } from '../product/entities/product.entity';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly connection: Connection,
  ) {}

  async create({ product_id, urls }) {
    const product = await this.productRepository.findOne({ id: product_id });
    return await Promise.all(
      urls.map((url) => this.imageRepository.save({ product, url })),
    );
  }

  async update({ product_id, urls }) {
    await this.imageRepository.delete({ product: product_id });

    const product = await this.productRepository.findOne({ id: product_id });

    return await Promise.all(
      urls.map((url) => this.imageRepository.save({ product, url })),
    );
  }
  // async update2({ product_id, urls }) {
  //   await this.imageRepository.findOne({product:product_id})
  //   if()

  //   await this.imageRepository.softDelete({product:product_id})

  // }
}
