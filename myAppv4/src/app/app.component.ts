import { Component } from '@angular/core';
import { ArticoliService } from './articoli.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArticoliService] //settiamo il servizio per rendenrlo disponbile al componente corrente
})
export class AppComponent {
  title = 'Articoli Tecnici';
  //modifichiamo il contenuto dell'articolo in modmo dinamico
  articolo;
  elencoArticoli;

//  constructor() {
//     this.articolo = {
//          titolo: "Creare componenti Angular 2",
//          autore: "Mario Rossi",
//          testo: "Creare componenti con Angular 2 è molto semplice.",
//          numApprezzamenti:0
//    };
//     this.elencoArticoli =[];
//  }
  
  mostraMessaggioRingraziamento(event) {
    alert("Grazie per aver espresso il tuo apprezzamento per l'articolo! \n Il numero di apprezzamenti raggiunti è ${event.numApprezzamenti}");
  }
  
//  addArticolo(eventArticolo){
//      this.elencoArticoli.push(eventArticolo);
//      console.log("Array is:" +  this.elencoArticoli.length + " last article " + this.elencoArticoli[this.elencoArticoli.length-1].titolo);
//  }
  
  //Esempio utilzzo servizio
  
  constructor(private articoliService: ArticoliService) { 
      //this.elencoArticoli = articoliService.getArticoli(); 
      
      //con l'http api e gli observable))
      articoliService.getArticoli().subscribe(result => { 
        this.elencoArticoli = result; 
      }); 
    } 
  
  addArticolo(eventArticolo) { 
      this.articoliService.addArticolo(eventArticolo); 
    } 
  
  

}
