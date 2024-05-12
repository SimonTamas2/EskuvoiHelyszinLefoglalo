import { Injectable } from '@angular/core';
import { addDoc, query, getDocs, where, deleteDoc, doc, DocumentReference } from 'firebase/firestore';
import { Location } from '../models/Location';
import { Firestore, collection } from '@angular/fire/firestore';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore: Firestore) { }

  async save(reservation: Reservation) {
    const docRef = await addDoc(collection(this.firestore, 'reservations'), reservation);
    return docRef;
  }

  async getAll() {
    const docsRef = await getDocs(query(collection(this.firestore, 'reservations')));
    return docsRef.docs.map(doc => doc.data());
  }

  async getByEmail(email: string) {
    const q = query(collection(this.firestore, 'reservations'), where("email", "==", email));
    const docsRef = await getDocs(q);
    return docsRef.docs.map(doc => doc.data());
  }

  async getByLocation(owner: string,name : string) {
    const q = query(collection(this.firestore, 'reservations'), 
      where("locationOwner", "==", owner),where("locationName","==",name));
    const docsRef = await getDocs(q);
    return docsRef.docs.map(doc => doc.data());
  }

  async get(email: string, owner: string,locationName : string) {
    const q = query(collection(this.firestore, 'reservations'), 
      where("locationOwner", "==", owner), where("email", "==", email),where("locationName","==",locationName));
    const docsRef = await getDocs(q);
    return docsRef.docs.at(0)?.data();
  }

  async delete(email: string, locationName: string,owner: string) {
    const q = query(collection(this.firestore, 'reservations'), 
      where("locationOwner", "==", owner), where("email", "==", email),where("locationName","==",locationName));
    const docsRef = await getDocs(q);
    return deleteDoc(docsRef.docs.at(0)?.ref as DocumentReference);
  }

  async changeAccepted(email: string, locationName: string,owner: string) {
    let old = await this.get(email,owner,locationName) as Reservation;
    await this.delete(email,locationName,owner);
    old.accepted = !old.accepted;
    await this.save(old);
  }
}
