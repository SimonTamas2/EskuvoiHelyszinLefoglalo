import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../shared/services/user-info.service';
import { LocationService } from '../../shared/services/location.service';
import { Location } from '../../shared/models/Location';
import { FormControl } from '@angular/forms';
import { Observable, from, map, startWith } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Reservation } from '../../shared/models/Reservation';
import { ReservationService } from '../../shared/services/reservation-service.service';


const SEARCH_ICON = `<?xml version="1.0" ?><svg enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 25 25" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>`


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit,OnInit{
 
  loggedInUser?: firebase.default.User | null;
  user?: User;

  observableUser? : Observable<User>;

  locations?: Location[] = [];
  filteredLocations?: Observable<Location[] | undefined>;

  reservedLocations?: Reservation[];

  loading = true;

  city = new FormControl("");
  cities : string[] = LocationService.CITY_LIST;
  filteredCities?:Observable<string[]>;


  constructor(private authService : AuthService,
    private router : Router,
    private userService : UserInfoService,
    private locationService : LocationService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private reservationService : ReservationService
  ){
    iconRegistry.addSvgIconLiteral('serach', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
  }


  ngOnInit(): void {
      this.locationService.getAll().then(res => {
        res.forEach(data => {
          this.locations?.push(data as Location);
        })
        this.loading = false;       
      }).catch(err => {
        console.error(err);
      })

      this.filteredCities = this.city.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      )
  }

  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  private async getReservations(user : User) {
      let result = await this.reservationService.getByEmail(user.email as string);
      if(result){
        this.reservedLocations = result as Reservation[];
      }
  }

  ngAfterViewInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      if(user == null)
        return;
      this.loggedInUser = user;
      let promise = this.userService.get(user.email as string);
      this.observableUser = from(promise);
      promise.then(async (data) => {
        this.user = data;
        await this.getReservations(this.user);

        let without_reservations = this.locations?.filter(loc => !this.currentUserReservation(loc))
        let reservations = this.locations?.filter(loc => this.currentUserReservation(loc))
        this.locations = [];
        if(reservations){
          this.locations.push(...reservations);
        }
        if(without_reservations){
          this.locations.push(...without_reservations);
        }

        this.filteredLocations = this.city.valueChanges.pipe(
          startWith(''),
          map((value : string | null) =>  {
            const filterValue = value?.toLowerCase();
            return this.locations?.filter(location => location.city.toLowerCase().includes(filterValue as string) || value == '')
          }),
        ) 
      });
    })      
  }

  currentUserReservation(location : Location) {
      return this.reservedLocations?.filter(res => res.locationName === location.name && res.locationOwner === location.owner).at(0);
  }
}
