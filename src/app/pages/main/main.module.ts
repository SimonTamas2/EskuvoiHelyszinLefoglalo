import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { LocationComponent } from './location/location.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [CommonModule,MatAutocompleteModule,MatTableModule,MatFormFieldModule,MainRoutingModule,
        MatTabsModule,NgFor,MatListModule,MatCardModule,MatButton,MatProgressSpinnerModule,LocationComponent,
        MatExpansionModule,MatGridListModule,AsyncPipe,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatIconModule],
    exports: [],
    declarations: [MainComponent],
    providers: [],
})
export class MainModule { }
