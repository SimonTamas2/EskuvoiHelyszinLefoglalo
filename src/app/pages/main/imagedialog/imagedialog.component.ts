import { Component, Inject, Input, OnInit } from '@angular/core';
import { Image } from '../../../shared/models/Location';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-imagedialog',
  standalone: true,
  imports: [],
  templateUrl: './imagedialog.component.html',
  styleUrl: './imagedialog.component.css'
})
export class ImagedialogComponent implements OnInit{
  @Input() image?: Image;

  constructor(
    public dialogRef: MatDialogRef<ImagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Image,
  ) {}


  ngOnInit(): void {
    this.image = this.data;
  }
}
