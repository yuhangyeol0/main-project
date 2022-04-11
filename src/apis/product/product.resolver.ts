import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { updateProductInput } from './dto/updateProduct.input';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER) //
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  async fetchProducts(@Args('search') search: string) {
    //redis에 캐시되어있는지 확인
    const productCache = await this.cacheManager.get(`${search}`);
    //있다면 반환
    if (productCache) {
      console.log(productCache);
      return productCache;
    }
    //없다면 엘라스틱서치에서 검색어 검색
    else {
      const result = await this.elasticsearchService.search({
        "query":{"bool":{"should":[{"prefix":{name:search}}]}}
    });
      //console.log([JSON.stringify(result, null, ' ')]);
      //조회된 결과 클라이언트에 반환
      const resultmap = result.hits.hits.map((el:any) => ({
        // const obj = {};
        // const resultsource = JSON.stringify(el._source);
        // const temp = JSON.parse(resultsource);
        // for (let key in temp) {
        //   if (!key.includes('@')) obj[key] = temp[key];
        // }
        // return obj;
        id:el._source.id,
        name:el._source.name,
        price:el._source.price,
      }));
      //엘라스틱서치에서 검색한것 redis에 저장
      await this.cacheManager.set(`${search}`, resultmap, { ttl: 0 });
      return resultmap;
    }
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
    return await this.productService.findOne({ productId });
  }

  @Mutation(() => [String])
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    //엘라스틱 서치에서 등록하기 연습 ✨ -> 연습, 실제로는 mysql에 저장할것
    // await this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct10', //테이블 컬랙션 개념의 인덱스
    //   document: {
    //     ...createProductInput,
    //   },
    // });
    return await this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: updateProductInput,
  ) {
    //await this.productService.checkSoldOut(productId);
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: string) {
    return await this.productService.delete({ productId });
  }

  @Mutation(() => Boolean)
  async restoreProduct(@Args('productId') productId: string) {
    return await this.productService.restore({ productId });
  }
}
