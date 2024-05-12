import { Injectable } from '@angular/core';
import { addDoc, query, getDocs, where, deleteDoc, doc, DocumentReference } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private firestore : Firestore){}

  async save(rating: Rating) {
    const docRef = await addDoc(collection(this.firestore, 'rating'), rating);
    return docRef;
  }

  async getAll() {
    const docsRef = await getDocs(query(collection(this.firestore, 'rating')));
    return docsRef.docs.map(doc => doc.data());
  }

  async getByEmail(email: string) {
    const q = query(collection(this.firestore, 'rating'), where("email", "==", email));
    const docsRef = await getDocs(q);
    return docsRef.docs.map(doc => doc.data());
  }

  async getByLocation(owner: string,name : string) {
    const q = query(collection(this.firestore, 'rating'), 
      where("locationOwner", "==", owner),where("locationName","==",name));
    const docsRef = await getDocs(q);
    return docsRef.docs.map(doc => doc.data());
  }

  async get(email: string, owner: string,locationName : string) {
    const q = query(collection(this.firestore, 'rating'), 
      where("locationOwner", "==", owner), where("email", "==", email),where("locationName","==",locationName));
    const docsRef = await getDocs(q);
    return docsRef.docs.at(0)?.data();
  }

  async delete(email: string, locationName: string,owner: string) {
    const q = query(collection(this.firestore, 'rating'), 
      where("locationOwner", "==", owner), where("email", "==", email),where("locationName","==",locationName));
    const docsRef = await getDocs(q);
    return deleteDoc(docsRef.docs.at(0)?.ref as DocumentReference);
  }
}
