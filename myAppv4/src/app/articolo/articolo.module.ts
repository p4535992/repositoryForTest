import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Articolo { 
    titolo:string; 
    autore:string; 
    testo:string; 
    numApprezzamenti:number = 0; 
} 
