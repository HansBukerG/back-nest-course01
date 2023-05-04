import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const newBrand = this.brandsService.create(name);
    const response = {
      message: 'A new brand has been created',
      data: newBrand,
    };
    return response;
  }

  @Get()
  findAll() {
    const brands = this.brandsService.findAll();
    const response = {
      message: `List with ${brands.length} items`,
      data: brands,
    };
    return response;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const brand = this.brandsService.findOne(id);
    const response = {
      message: 'Data on cache found',
      data: brand,
    };
    return response;
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const { name } = updateBrandDto;
    const updatedBrand = this.brandsService.update(id, name);
    const response = {
      message: 'A Brand has been modified',
      data: updatedBrand,
    };
    return response;
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const brands = this.brandsService.remove(id);
    const response = {
      message: 'A Brand has been delted',
      data: brands,
    };
    return response;
  }
}
