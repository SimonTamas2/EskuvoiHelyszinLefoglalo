import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../shared/models/User';
import { Location } from '../../../shared/models/Location';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImagedialogComponent } from '../imagedialog/imagedialog.component';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../../shared/services/reservation-service.service';
import { Reservation } from '../../../shared/models/Reservation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserv-dialog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatButtonModule],
  providers :[provideNativeDateAdapter()],
  templateUrl: './reserv-dialog.component.html',
  styleUrl: './reserv-dialog.component.css'
})
export class ReservDialogComponent implements OnInit{

  location?:Location;
  userObservable?:Observable<User>;
  user?:User;

  email = new FormControl("",Validators.email)
  fullname = new FormControl("",Validators.required)
  phoneNumber = new FormControl("",Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"))
  numberOfPeople = new FormControl(0,Validators.required)
  date = new FormControl(new Date(),Validators.required)

  constructor(
    public dialogRef: MatDialogRef<ImagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService : ReservationService,
  ) {}


  ngOnInit(): void {
    this.location = this.data.location;
    this.userObservable = this.data.user;

    this.userObservable?.subscribe(user => {
      this.user = user;

      this.email.disable();
      this.fullname.disable();
      this.phoneNumber.disable();

      this.email.setValue(this.user?.email as string);
      this.fullname.setValue(this.user?.firstName + " " + this.user?.lastName);
      this.phoneNumber.setValue(this.user?.phoneNumber as string);
    })
  }

  async submit() {

      if(!this.numberOfPeople.valid || !this.date.valid){
        alert("Minden ki kell legyen töltve!");
        return; 
      }

      var reservation : Reservation = {
        email : this.user?.email as string,
        fullName : this.user?.firstName + " " + this.user?.lastName,
        phoneNumber : this.user?.phoneNumber as string,
        numberOfPeople : this.numberOfPeople.value as number,
        date : this.date.value?.toDateString() as string,
        locationName : this.location?.name as string,
        locationOwner : this.location?.owner as string,
        accepted : false,
      }

      let old = await this.reservationService.get(reservation.email,reservation.locationOwner,reservation.locationName);
      if(old){
        alert("Ezt a helyet már lefoglaltad! Töröld a foglalást és foglalj újra ha változtatni akarsz a foglaláson!");
        return;
      }

      let res = await this.reservationService.save(reservation);

      if(res){
        alert("Sikeres foglalás!");
      }else {
        alert("Sikertelen foglalás!");
      }
      window.location.reload();
  }

}
