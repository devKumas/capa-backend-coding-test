import { Get, JsonController, Param } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { StoreService } from '../services/StoreService';

@OpenAPI({
  tags: ['Store'],
})
@JsonController('/stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @OpenAPI({
    summary: '전체 Store 조회',
    description: '등록된 Store을 모두 반환합니다.',
    statusCode: '200',
  })
  @Get('')
  async readStores() {
    return await this.storeService.readStores();
  }

  @OpenAPI({
    summary: '상세 Store 조회',
    description: '선택된 Store의 상세정보와 주변 Store를 반환합니다.',
    statusCode: '200',
    responses: {
      '404': {
        description: 'There is no matching information.',
      },
    },
  })
  @Get('/:storeName')
  async readStore(@Param('storeName') storeName: string) {
    return await this.storeService.readStore(storeName);
  }
}
