import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  public brands: Brand[] = [
    {
      id: uuid(),
      name: 'Hyundai',
      createdAt: new Date().getTime(),
      updatedAt: 0,
    },
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
      updatedAt: 0,
    },
    {
      id: uuid(),
      name: 'Chevrolet',
      createdAt: new Date().getTime(),
      updatedAt: 0,
    },
  ];

  create(name: string): Brand {
    const newBrand: Brand = {
      id: uuid(),
      name,
      createdAt: new Date().getTime(),
      updatedAt: 0,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with ${id} not found`);
    return brand;
  }

  update(id: string, name: string) {
    const brandIndex = this.brands.findIndex((brand) => brand.id === id);
    if (brandIndex === -1) {
      throw new NotFoundException(`brand with id ${id} not found`);
    }
    const updatedbrand = {
      ...this.brands[brandIndex],
      name,
      updatedAt: new Date().getTime(),
    };
    this.brands[brandIndex] = updatedbrand;
    return updatedbrand;
  }

  remove(id: string): Brand[] {
    const brand = this.findOne(id);
    if (!brand) throw new NotFoundException(`Brand with ${id} not found`);

    this.brands = this.brands.filter((brand) => brand.id !== id);
    return this.brands;
  }
}
