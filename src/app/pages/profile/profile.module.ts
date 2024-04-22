import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LocationMakerComponent } from '../location-maker/location-maker.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    imports: [CommonModule,MatTableModule,MatTabsModule,NgFor,MatListModule,MatCardModule,ProfileRoutingModule,MatButton,MatProgressSpinnerModule,LocationMakerComponent,MatExpansionModule,MatGridListModule],
    exports: [],
    declarations: [ProfileComponent],
    providers: [],
})
export class ProfileModule { }
