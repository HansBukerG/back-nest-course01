import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    const cars = this.carsService.findAllCars();
    const response = {
      message: `${cars.length} cars found`,
      data: cars,
    };
    return response;
  }
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    console.log(`New request for id: ${id}`);

    const carFound = this.carsService.findCarById(id);

    const response = { data: carFound };
    console.log(response);
    return response;
  }

  @Post()
  createCar(@Body() body: any) {
    const { brand, model } = body;
    console.log(
      `Request for createCar controller with data ${brand} and ${model}`,
    );

    const newCar = this.carsService.createNewCar(brand, model);

    const response = {
      message: `A new car has been added`,
      data: newCar,
    };

    return response;
  }

  @Patch(':id')
  patchCar(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
    const { brand, model } = body;
    const updatedCar = this.carsService.modifyCar(id, brand, model);
    const response = {
      message: `Car ${id} has been updated`,
      data: updatedCar,
    };
    return response;
  }

  //   deleteCar(@Param('id', ParseIntPipe) id: number) {
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.carsService.findCarById(id)) throw new Error('Car not found');

    const confirmDelete = this.carsService.deleteCar(id);
    if (!confirmDelete) throw new Error('There is an error deleting this item');

    const response = {
      message: `The item with id: ${id}, has been deleted`,
      data: confirmDelete,
    };
    return response;
  }
}
