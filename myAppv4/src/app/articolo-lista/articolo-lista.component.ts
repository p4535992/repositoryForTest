import { Component, OnInit } from '@angular/core';
import {ArticoliService} from '../articoli.service'

//import { Component } from '@angular/core';
//import { ArticoliService } from './articoli.service'

@Component({
  selector: 'app-articolo-lista',
  templateUrl: './articolo-lista.component.html',
  styleUrls: ['./articolo-lista.component.css'],
  providers: [ArticoliService] 
})
export class ArticoloListaComponent implements OnInit {

    elencoArticoli; 
    
    constructor(private articoliService: ArticoliService) { 
      articoliService.getArticoli().subscribe(result => { 
                        this.elencoArticoli = result; 
                      }); 
    }   

  ngOnInit() {
  }

}
