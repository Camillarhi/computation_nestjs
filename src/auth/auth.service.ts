import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginDTO } from './models/login.dto';
import { RegisterDto } from './models/register.dto';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

@Injectable()
export class AuthService {
    constructor(
        private firebaseService: FirebaseService
    ) { }

    async login(data: LoginDTO) {

    };

    async register(data: RegisterDto) {
        const userCedential: UserCredential = await createUserWithEmailAndPassword(
            this.firebaseService.auth,
            data.email,
            data.password
        )
    };

}
