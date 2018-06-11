import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Articolo }  from './articolo.module'

@Component({
  selector: 'articolo',
  templateUrl: './articolo.component.html',
  styleUrls: ['./articolo.component.css']
})
export class ArticoloComponent implements OnInit,OnChanges {

//   articolo:Articolo
//
//  constructor() {
//      this.articolo ={
//          titolo: "Creare componenti Angular 2",
//          autore: "Mario Rossi",
//          testo:  "Creare componenti con Angular 2 è molto semplice."
//      };
//
//  }

    //Modifichiamo in mod dinamico
    @Input() articolo: Articolo;
    @Output() like = new EventEmitter<{numApprezzamenti: number}>();
    constructor() {

    }


    incrementaApprezzamenti(event) {
        this.articolo.numApprezzamenti = this.articolo.numApprezzamenti + 1;
        this.like.emit({numApprezzamenti: this.articolo.numApprezzamenti});
        //event.preventDefault();
    }

    ngOnInit() {
        console.log("ArticoloComponent OnInit!");
    }
    
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        console.log("ArticoloComponent OnChanges!");
        if (changes["articolo"] && changes["articolo"].currentValue.testo) {
         
            let testoArticolo = changes["articolo"].currentValue.testo;
            changes["articolo"].currentValue.testo = testoArticolo.replace("è", "XXXXX") ;
            console.log("ArticoloComponent OnChanges=> Chnaged!");
        }
    }

}
