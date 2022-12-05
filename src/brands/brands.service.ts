import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid'

import { Brand } from './entities/brand.entity';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
     id:uuid(),
     name: 'Toyota',
     createAt: new Date().getTime()
    }
  ];
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createAt: new Date().getTime(),
    }
    this.brands.push( brand );
    return 'This action adds a new brand';
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id);
    if(!brand) 
      throw new NotFoundException(`Brand with id "${id}" not foud`)
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDB = this.findOne(id);
    this.brands.map(brand =>{
      if(brand.id === id){
        brandDB.updateAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto}
        return brandDB;
      }
      return brand;
    });
    return brandDB;
  }

  remove(id: string) {
    this.brands = this.brands.filter( brand => brand.id !== id);
  }
}
