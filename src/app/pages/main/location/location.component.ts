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

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule,MatCardModule,MatButtonModule,MatRadioModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit{

  @Input() location?: Location;

  owner?: User;

  loading = true;

  currentImage?:Image;
  currentImageId = 1;

  constructor(private userService : UserInfoService,public dialog: MatDialog){}

  ngOnInit(): void {
      this.userService.get(this.location?.owner as string).then(res => {
        this.owner = res;
        this.loading = false;
      })

      this.currentImage = this.location?.images[0];
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
    
  }
}
