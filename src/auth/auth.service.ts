import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginDTO } from './models/login.dto';
import { RegisterDto } from './models/register.dto';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { setDoc, DocumentReference, doc, DocumentSnapshot, DocumentData, getDoc, query, where } from "firebase/firestore";
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private firebaseService: FirebaseService,
        private jwtService: JwtService
    ) { }

    async getUser(id: string) {
        console.log({ id })
        const result = query(this.firebaseService.userCollection, where("id", "==", id));
        return result;
    }

    async login(data: LoginDTO): Promise<Omit<any, "password">> {
        try {
            const user: UserCredential = await signInWithEmailAndPassword(this.firebaseService.auth, data.email, data.password);
            if (user) {
                const id: string = user?.user.uid;
                const docRef: DocumentReference = doc(this.firebaseService.userCollection, id);
                const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
                const loggedUser: User = {
                    ...snapshot.data(),
                    id: snapshot?.id,
                } as User;
                delete loggedUser?.password;
                const payload = { username: loggedUser.email, sub: loggedUser.id };
                const jwtToken = await this.jwtService.signAsync(payload);
                // return loggedUser;
                return {
                    loggedUser,
                    access_token: jwtToken,
                };
            }
        } catch (error) {
            return error?.message
        };
    };

    async register(data: RegisterDto) {
        try {
            const userCedential: UserCredential = await createUserWithEmailAndPassword(
                this.firebaseService.auth,
                data.email,
                data.password
            );
            if (userCedential) {
                const id: string = userCedential.user.uid;
                const docRef: DocumentReference = doc(this.firebaseService.userCollection, id);
                delete data?.confirmPassword;
                await setDoc(docRef, data);
                return { message: "Registration successful" };
            }

        } catch (error) {
            return error?.message
        };
    };

}
