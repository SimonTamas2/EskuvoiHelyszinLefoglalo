import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-upload-files',
  standalone:true,
  imports:[MatListModule,CommonModule,NgFor,MatButtonModule],
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent{
  selectedFiles : Array<File> = [];

  @Output() filesChanged = new EventEmitter<Array<File>>();

  constructor() { }

  upload(event : any) {
      let file : File = event.target.files[0];
      if(file.type != "image/png" && file.type != "image/jpeg"){
        event.target.value = null;
        alert("Csak png és jpg típusú képet lehet feltölteni!");
        return;
      }
      if(file.size > 1000000){
        event.target.value = null;
        alert("A kép túl nagy! (max 1mb)");
        return;
      }
      if(this.selectedFiles.filter(f => f.name == file.name).length > 0){
        alert("Ugyanazt a képet csak 1x töltheted fel!");
        return;
      }
      this.selectedFiles.push(file);
      event.target.value = null;
      this.filesChanged.emit(this.selectedFiles);
  }

  remove(index : number) {
    delete this.selectedFiles[index];
    this.selectedFiles = this.selectedFiles.filter(f => f);
    this.filesChanged.emit(this.selectedFiles);
  }
}
