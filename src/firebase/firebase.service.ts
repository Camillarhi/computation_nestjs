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
            apiKey: "AIzaSyC9hv2TByyoYWGDhEP-f-I5MtHLAse9lTQ",
            authDomain: "computation-60a26.firebaseapp.com",
            projectId: "computation-60a26",
            storageBucket: "computation-60a26.appspot.com",
            messagingSenderId: "1013642692413",
            appId: "1:1013642692413:web:5ad510db04701833b8e754",
            measurementId: "G-WW868MBGEW"
        });

        this.auth = getAuth(this.app);
        this.firestore = getFirestore(this.app);
        this.createCollections();
    }
    private createCollections() {
        this.userCollection = collection(this.firestore, "users");
    };
}
