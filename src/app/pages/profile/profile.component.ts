import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../shared/services/user-info.service';
import { User } from '../../shared/models/User';
import { Location } from '../../shared/models/Location';
import { LocationService } from '../../shared/services/location.service';
import { Reservation } from '../../shared/models/Reservation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  loading = true;

  firstName : String = "";
  lastName : String = "";

  loggedInUser?: firebase.default.User | null;

  user?: User;

  locations : Array<Location> = [];

  Math : Math;

  constructor(private authService : AuthService,private router : Router,private userService : UserInfoService,private locationService : LocationService){
    this.Math = Math;
  }

  logout() {
      this.authService.logout();
      alert("Kijelentkeztél!");
      this.router.navigateByUrl("/");
  } 

  ngOnInit(): void {  
      this.authService.isUserLoggedIn().subscribe(user => {
          if(user == null)
            return;
          this.loggedInUser = user;
          this.userService.get(user.email as string).then(data => {
            this.user = data;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.loading = false;
          });
          
          if(user.email == "admin"){
            this.locationService.getAll().then(res => {
              this.locations = res as Location[];
            });
            return;
          }
          this.locationService.getByEmail(user?.email as string).then(res => {
            this.locations = res as Location[];
        });
      })      
  }

  delete(location : Location) {
      this.locationService.delete(location.owner,location.name).then(()=>{
        this.ngOnInit();
      }).catch(error => {
        console.error(error);
      });
  }
}
