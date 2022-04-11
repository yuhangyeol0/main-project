import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Image } from './entities/image.entity';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => [Image])
  async uploadImage(
    @Args('product_id') product_id: string,
    @Args({ name: 'urls', type: () => [String] }) urls: string[],
  ) {
    //클라이언트에서 상품 id와 이미지 url 목록을 받아, 이미지 테이블에 데이터를 추가합니다.
    return await this.imageService.create({ product_id, urls });
  }

  @Mutation(() => [Image])
  async updateImage(
    @Args({ name: 'urls', type: () => [String] }) urls: string[],
    @Args('product_id') product_id: string,
  ) {
    return await this.imageService.update({ urls, product_id });
  }

  // @Mutation(() => [Image])
  // async updateImage2(
  //   @Args({ name: 'urls', type: () => [String] }) urls: string[],
  //   @Args('product_id') product_id: string,
  // ) {
  //   return await this.imageService.update2({ urls, product_id });
  // }
}

/*1. 클라이언트에서 상품의 id와 해당하는 상품에 들어갈 모든 이미지 url 목록을 보내줍니다. 
2. 이미지 테이블에서 상품 id가 일치하는 데이터를 모두 삭제합니다. 
3. 새로운 이미지 url을 가지고 데이터를 생성합니다. 
4. 즉, 기존 데이터를 수정하는게 아니라, 
상품 ID에 해당하는 기존 데이터를 전부 삭제하고 → 새로 전부 생성합니다. */
