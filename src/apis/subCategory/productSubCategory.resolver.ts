import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductSubCategory } from './entities/productSubCategory.entity';
import { ProductSubCategoryService } from './productSubCategory.service';

@Resolver()
export class ProductSubCategoryResolver {
  constructor(
    private readonly productSubCategoryService: ProductSubCategoryService,
  ) {}

  @Mutation(() => ProductSubCategory)
  async createProductSubCategory(@Args('name') name: string) {
    return await this.productSubCategoryService.create({ name });
  }

  @Mutation(() => Boolean)
  async deleteProductCategory(
    @Args('productSubCategoryId') productSubCategoryId: string,
  ) {
    return await this.productSubCategoryService.delete({
      productSubCategoryId,
    });
  }
}
