import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products')
  async getProducts() {
    return this.catalogService.getProducts();
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: number, @Query('distance') distance: number, @Query('floor') floor: number) {
    return this.catalogService.getProduct(id, distance, floor);
  }
}