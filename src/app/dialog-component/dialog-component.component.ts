import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.css'
})
export class DialogComponent implements OnInit{

  public type = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data && this.data.type) {
      this.type = this.data.type;
    }
    
  }
}