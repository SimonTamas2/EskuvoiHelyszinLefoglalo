import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserInfoService } from '../../../shared/services/user-info.service';
import { Image, Location } from '../../../shared/models/Location';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { ImagedialogComponent } from '../imagedialog/imagedialog.component';
import { ReservDialogComponent } from '../reserv-dialog/reserv-dialog.component';
import { ReservationService } from '../../../shared/services/reservation-service.service';
import { Reservation } from '../../../shared/models/Reservation';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Rating } from '../../../shared/models/Rating';
import { RatingService } from '../../../shared/services/rating.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


const RATING_ICON = `<svg fill="yellow" id="Icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.053,12.683a3.132,3.132,0,0,0-1.737-5.341l-3.909-.568a1.13,1.13,0,0,1-.851-.619L14.808,2.614a3.131,3.131,0,0,0-5.616,0L7.444,6.155a1.13,1.13,0,0,1-.851.619l-3.909.568A3.132,3.132,0,0,0,.947,12.684L3.776,15.44a1.131,1.131,0,0,1,.326,1l-.667,3.892a3.131,3.131,0,0,0,4.542,3.3l3.5-1.838a1.125,1.125,0,0,1,1.052,0h0l3.5,1.838a3.11,3.11,0,0,0,3.3-.239,3.109,3.109,0,0,0,1.245-3.063L19.9,16.441a1.13,1.13,0,0,1,.326-1Zm-4.226,1.325a3.131,3.131,0,0,0-.9,2.772l.667,3.892a1.131,1.131,0,0,1-1.642,1.193l-3.5-1.838a3.134,3.134,0,0,0-2.914,0l-3.5,1.838a1.131,1.131,0,0,1-1.642-1.193l.667-3.891a3.132,3.132,0,0,0-.9-2.773L2.344,11.251a1.132,1.132,0,0,1,.627-1.93L6.88,8.753A3.128,3.128,0,0,0,9.237,7.04L10.985,3.5a1.165,1.165,0,0,1,2.03,0L14.763,7.04A3.128,3.128,0,0,0,17.12,8.753l3.909.568a1.132,1.132,0,0,1,.627,1.93Z"/></svg>`


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,MatCardModule,MatButtonModule,MatRadioModule,DateFormatPipe,MatIconModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit{

  @Input() location?: Location;
  @Input() user? : Observable<User>;

  currentUser? : User;

  owner?: User;

  loading = true;

  currentImage?:Image;
  currentImageId = 1;

  ratings?: Rating[];
  averageRating = 0;

  @Input() currentUserReservation?: Reservation | undefined;

  constructor(private userService : UserInfoService,public dialog: MatDialog,private reservationService : ReservationService,private router : Router
    ,private ratingService : RatingService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIconLiteral('rating-icon', sanitizer.bypassSecurityTrustHtml(RATING_ICON));
  }

  ngOnInit(): void {
      this.userService.get(this.location?.owner as string).then(res => {
        this.owner = res;
        this.loading = false;
      })

      this.currentImage = this.location?.images[0];

      this.ratingService.getByLocation(this.location?.owner as string,this.location?.name as string).then(res => {
        this.ratings = res as Rating[]; 

        let RatingPoints = 0;
        this.ratings.forEach(rating => {
          RatingPoints += rating.points;
        })
        this.averageRating = RatingPoints/this.ratings.length;
        if(!this.averageRating){
          this.averageRating = 0;
        }
      })

      this.user?.subscribe(res => {
        this.currentUser = res;
      })
  }

  zoomImage() {
    let dialogRef = this.dialog.open(ImagedialogComponent, {
      data : this.currentImage
    });
  }

  changeImage(id : number) {
    this.currentImage = this.location?.images[id];
  }

  interest() {
    if(!this.user){
      this.router.navigateByUrl("/login");
      return;
    }
    let dialogRef = this.dialog.open(ReservDialogComponent, {
      data : {
        location:this.location,user:this.user
      }
    });
  }

  async removeInterest() {
    let res = await this.reservationService.delete(this.currentUserReservation?.email as string,this.currentUserReservation?.locationName as string,
      this.currentUserReservation?.locationOwner as string);
    alert("Foglaláskérelem törölve!");
    window.location.reload();
  }

  async changeRating(value : number) {
      let rating : Rating = {
        locationName : this.location?.name as string,
        locationOwner : this.location?.owner as string,
        email : this.currentUser?.email as string,
        points : value
      }

      let exist = await this.ratingService.get(rating.email,rating.locationOwner,rating.locationName);
      if(exist)
        await this.ratingService.delete(rating.email,rating.locationName,rating.locationOwner);

      let res = await this.ratingService.save(rating);
      if(res){
        alert("Értékelés elmentve!");
        window.location.reload();
      }
  }
}
