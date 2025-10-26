import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products')
  @Header('Access-Control-Allow-Origin', '*')
  async getProducts() {
    return this.catalogService.getProducts();
  }

  @Get('products/:id')
  @Header('Access-Control-Allow-Origin', '*')
  async getProduct(@Param('id') id: number, @Query('distance') distance: number, @Query('floor') floor: number) {
    return this.catalogService.getProduct(id, distance, floor);
  }
}