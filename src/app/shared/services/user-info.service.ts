import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private firestore: Firestore) { }

  async save(user : User) {
      const docRef = await addDoc(collection(this.firestore,'users'),user);
      return docRef;
  }

  async getAll() {
    const docsRef = await getDocs(query(collection(this.firestore,'users')));
    return docsRef.docs.map(doc => doc.data());
  }

  async get(email : String) : Promise<User>{
    const q = query(collection(this.firestore,'users'),where("email","==",email));
    const docsRef = await getDocs(q);
    return docsRef.docs.at(0)?.data() as unknown as User;
  }
}
