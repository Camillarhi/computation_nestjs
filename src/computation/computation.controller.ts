import { Controller, Get, Post } from '@nestjs/common';
import { ComputationService } from './computation.service';

@Controller('computation')
export class ComputationController {
  constructor(private readonly computationService: ComputationService) { }

  @Get()
  async getAll() {

  };

  @Post()
  async addition() {

  };

  @Post()
  async substraction() {

  };

  @Post()
  async multiplication() {

  };

  @Post()
  async division() {

  };

  @Post()
  async root() {

  };

  @Post()
  async modulus() {

  };
}
