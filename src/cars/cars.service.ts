import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'toyota', model: 'Rav4' },
    { id: uuid(), brand: 'hyundai', model: 'Accent' },
    { id: uuid(), brand: 'chevrolet', model: 'Hilux' },
  ];

  public findAllCars(): Car[] {
    return this.cars;
  }

  public findCarById(id: string): Car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with index ${id} not found`);
    }
    return car;
  }

  public createNewCar(brand: string, model: string): Car {
    const newCar = { id: uuid(), brand, model };
    this.cars.push(newCar);
    return newCar;
  }

  public modifyCar(id: string, brand: string, model: string): Car {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    const updatedCar = { ...this.cars[carIndex], brand, model };
    this.cars[carIndex] = updatedCar;
    return updatedCar;
  }

  public deleteCar(id: string): boolean {
    const initialLength = this.cars.length;
    this.cars = this.cars.filter((car) => car.id !== id);
    const isDeleted = initialLength !== this.cars.length;
    return isDeleted;
  }
}
