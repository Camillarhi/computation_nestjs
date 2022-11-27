import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { CollectionReference, Firestore, getFirestore, collection } from "firebase/firestore"

@Injectable()
export class FirebaseService {
    public app: FirebaseApp;
    public auth: Auth;
    public userCollection: CollectionReference;
    public firestore: Firestore;

    constructor(
        private configService: ConfigService
    ) {
        this.app = initializeApp({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID
        });

        this.auth = getAuth(this.app);
        this.firestore = getFirestore(this.app);
        this.createCollections();
    }
    private createCollections() {
        this.userCollection = collection(this.firestore, "users");
    };
}
