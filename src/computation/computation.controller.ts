import { Controller, Get, Post, Body, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComputationService } from './computation.service';
import { ComputationDTO } from './models/computation.dto';

@UseGuards(JwtAuthGuard)
@Controller('computation')
export class ComputationController {
  constructor(
    private readonly computationService: ComputationService,
    private readonly authService: AuthService
  ) { }

  @Get()
  async getAll(@Req() request: Request) {
    return this.computationService.getAll(request.user["userId"]);
  };

  @Post("addition")
  async addition(@Body() body: ComputationDTO, @Req() request: Request) {
    return this.computationService.addition(body, request.user["userId"]);
  };

  @Post("substraction")
  async substraction(@Body() body: ComputationDTO, @Req() request: Request) {
    return this.computationService.substraction(body, request.user["userId"]);
  };

  @Post("multiplication")
  async multiplication(@Body() body: ComputationDTO, @Req() request: Request) {
    return this.computationService.multiplication(body, request.user["userId"]);
  };

  @Post("division")
  async division(@Body() body: ComputationDTO, @Req() request: Request) {
    return this.computationService.divison(body, request.user["userId"]);
  };

  @Post("root")
  async root(@Body() body: ComputationDTO, @Req() request: Request) {
    return this.computationService.root(body, request.user["userId"]);
  };

  @Post("modulus")
  async modulus(@Body() body: ComputationDTO, @Req() request: Request) {
    return this.computationService.modulus(body, request.user["userId"]);
  };

  @Delete(":id")
  async del(@Param("id") id: string) {
    return this.computationService.deleteResult(id);
  };
}
