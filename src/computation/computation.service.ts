import { Injectable } from '@nestjs/common';
import { doc, DocumentReference, getDocs, setDoc, query, where } from "firebase/firestore";
import { FirebaseService } from 'src/firebase/firebase.service';
import { uniqueId } from 'src/utils/uniqueId';

@Injectable()
export class ComputationService {
    constructor(
        private firebaseService: FirebaseService,
    ) { }

    async getAll(user: any) {
        const result = [];
        const q = query(this.firebaseService.computationCollection, where("userId", "==", user));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
        return result;
    };

    async addition(data: any, user: any) {
        try {
            if (!data?.secondInput) data.secondInput = 0;
            const result = Number(data?.firstInput) + Number(data?.secondInput);
            data.id = uniqueId();
            data.result = result;
            // data.operation = "+";
            data.userId = user;
            const docRef: DocumentReference = doc(this.firebaseService.computationCollection, data.id);
            await setDoc(docRef, data);
            return result;
        } catch (error) {
            return error?.message
        };
    };

    async substraction(data: any, user: any) {
        try {
            if (!data?.secondInput) data.secondInput = 0;
            const result = data?.firstInput - data?.secondInput;
            data.id = uniqueId();
            data.result = result;
            // data.operation = "-";
            data.userId = user;
            const docRef: DocumentReference = doc(this.firebaseService.computationCollection, data.id);
            await setDoc(docRef, data);
            return result;
        } catch (error) {
            return error?.message
        };
    };

    async divison(data: any, user: any) {
        try {
            if (!data?.secondInput) data.secondInput = 1;
            const result = data?.firstInput / data?.secondInput;
            data.id = uniqueId();
            data.result = result;
            // data.operation = "/";
            data.userId = user;
            const docRef: DocumentReference = doc(this.firebaseService.computationCollection, data.id);
            await setDoc(docRef, data);
            return result;
        } catch (error) {
            return error?.message
        };
    };

    async multiplication(data: any, user: any) {
        try {
            if (!data?.secondInput) data.secondInput = 1;
            const result = data?.firstInput * data?.secondInput;
            data.id = uniqueId();
            data.result = result;
            // data.operation = "*";
            data.userId = user;
            const docRef: DocumentReference = doc(this.firebaseService.computationCollection, data.id);
            await setDoc(docRef, data);
            return result;
        } catch (error) {
            return error?.message
        };
    };

    async root(data: any, user: any) {
        try {
            data.secondInput = 0;
            const result = Math.sqrt(data?.firstInput);
            data.id = uniqueId();
            data.result = result;
            // data.operation = "√";
            data.userId = user;
            const docRef: DocumentReference = doc(this.firebaseService.computationCollection, data.id);
            await setDoc(docRef, data);
            return result;
        } catch (error) {
            return error?.message
        };
    };

    async modulus(data: any, user: any) {
        try {
            if (!data?.secondInput) data.secondInput = 1;
            const result = data?.firstInput % data?.secondInput;
            data.id = uniqueId();
            data.result = result;
            // data.operation = "%";
            data.userId = user;
            const docRef: DocumentReference = doc(this.firebaseService.computationCollection, data.id);
            await setDoc(docRef, data);
            return result;
        } catch (error) {
            return error?.message
        };
    };
}
