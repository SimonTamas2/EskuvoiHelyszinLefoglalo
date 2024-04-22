import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadFilesComponent } from './fileupload/upload-files.component';
import { Image, Location } from '../../shared/models/Location';
import { LocationService } from '../../shared/services/location.service';
import { Router } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import compress from 'compress-base64'

@Component({
  selector: 'app-location-maker',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatNativeDateModule,ReactiveFormsModule,UploadFilesComponent,MatAutocompleteModule,AsyncPipe],
  templateUrl: './location-maker.component.html',
  styleUrl: './location-maker.component.css'
})
export class LocationMakerComponent implements OnInit{

  @Input() user? : User;

  files?: Array<File>;

  cities : string[] = LocationService.CITY_LIST;
  filteredCities?:Observable<string[]>;

  name = new FormControl("",Validators.required);
  address = new FormControl("",Validators.required);
  description = new FormControl("",Validators.required);
  city = new FormControl("",[Validators.required])
  
  constructor(private locationService : LocationService, private router : Router){}


  ngOnInit(): void {
    this.filteredCities = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  private blobToBase64(blob : Blob) {
    return new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  async create() {
      if(!this.name.valid || !this.address.valid || !this.description.valid || !this.files){
        alert("Hely nem lett hozzáadva! Nem lehet eggyik mező sem üres!");
        return;
      }
      if(!this.cities.includes(this.city.value as string)){
        alert("Nincs ilyen város!");
        return;
      }

      let images : Array<Image> = [];

      await Promise.all(this.files?.map(async file => {
        try {
          let data = await this.blobToBase64(file);
          compress(data,{
            max:80000,
          })
          let size = file.size;
          let type = file.type;
          let name = file.name;
          images.push({data,size,type,name});
        }catch(err){
          console.log(err);
          alert("Hiba történt!");
        }
      }));

      let res = await this.locationService.get(this.user?.email as string,this.name.value as string);
      if(res){
        alert("Nem lehet 2 ugyanolyan nevű helyszíned!");
        return;
      }

      let location : Location = {
        name : this.name.value as string,
        address : this.address.value as string,
        images : images,
        description : this.description.value as string,
        owner : this.user?.email as string,
        city : this.city.value as string
      }

      console.log(location)

      this.locationService.save(location).then(() => {
        alert("Hely hozzáadva!");
        window.location.reload();
      }).catch(error => {
        console.error(error);
        alert("Hely nem lett hozzáadva!");
      });
  }

  filesChanged(files : File[]) {
    this.files = files;
  }

}
