import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FirebaseService } from './firebase/firebase.service';
import { ComputationModule } from './computation/computation.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), ComputationModule],
  providers: [FirebaseService],
})
export class AppModule { }
