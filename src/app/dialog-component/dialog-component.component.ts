import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.css'
})
export class DialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  ngOnInit() {
  }
}