import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistComponent } from './regist.component';
import { CommonModule } from '@angular/common';
import { RegistRoutingModule } from './regist-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [CommonModule,ReactiveFormsModule,RegistRoutingModule,MatFormFieldModule,MatButtonModule,MatInputModule],
    exports: [],
    declarations: [RegistComponent],
    providers: [],
})
export class RegistModule { }
