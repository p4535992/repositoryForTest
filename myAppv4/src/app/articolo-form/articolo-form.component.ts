import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Articolo } from '../articolo/articolo.module';

@Component({
  selector: 'articolo-form',
  templateUrl: './articolo-form.component.html',
  styleUrls: ['./articolo-form.component.css']
})
export class ArticoloFormComponent implements OnInit {
    
    @Output() submit = new EventEmitter<Articolo>(); 
    //model = new Articolo(); 
    model;
  constructor() { 
    this.model = new Articolo(); 
      
  }

  ngOnInit() {
  }
  
  inviaArticolo(event) { 
      this.submit.emit(this.model)      
    } 

}
