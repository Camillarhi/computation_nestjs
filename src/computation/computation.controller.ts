import { Controller } from '@nestjs/common';
import { ComputationService } from './computation.service';

@Controller('computation')
export class ComputationController {
  constructor(private readonly computationService: ComputationService) {}
}
