import { Module } from '@nestjs/common';
import { ComputationService } from './computation.service';
import { ComputationController } from './computation.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ComputationController],
  providers: [ComputationService, FirebaseService]
})
export class ComputationModule { }
