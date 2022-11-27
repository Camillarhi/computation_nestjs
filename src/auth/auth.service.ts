import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginDTO } from './models/login.dto';
import { RegisterDto } from './models/register.dto';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { setDoc, DocumentReference, doc, DocumentSnapshot, DocumentData, getDoc } from "firebase/firestore";
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        private firebaseService: FirebaseService
    ) { }

    async login(data: LoginDTO): Promise<Omit<User, "password">> {
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
                return loggedUser;
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
            }
        } catch (error) {
            return error?.message
        };
    };

}
