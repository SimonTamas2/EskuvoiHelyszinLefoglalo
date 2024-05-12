import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '../../../shared/models/Location';
import { CommonModule, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservation-service.service';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-profile-location',
  standalone: true,
  imports: [CommonModule,MatTableModule,DateFormatPipe,MatTabsModule,NgFor,MatListModule,MatCardModule,MatButton,MatProgressSpinnerModule,MatExpansionModule,MatGridListModule],
  templateUrl: './profile-location.component.html',
  styleUrl: './profile-location.component.css'
})
export class ProfileLocationComponent implements OnInit{

  @Input() location?:Location;

  @Output() deleteEvent = new EventEmitter();

  constructor(private reservationService : ReservationService){};

  reservations: Reservation[] = [];

  ngOnInit(): void {
    this.reservationService.getByLocation(this.location?.owner as string,this.location?.name as string).then(res => {
      if(res)
        this.reservations = res as Reservation[];
    })
  }

  async changeAccept(reservation : Reservation) {
      await this.reservationService.changeAccepted(reservation.email,reservation.locationName,reservation.locationOwner);
      window.location.reload();
  }
}
