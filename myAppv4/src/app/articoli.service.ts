import { Injectable } from '@angular/core';
import { Articolo } from "./articolo/articolo.module"
import { Http } from '@angular/http'; 
import { Observable } from 'rxjs';

@Injectable()
export class ArticoliService {

    private elencoArticoli: Articolo[]; 



//constructor() {   
//  this.elencoArticoli = [{ 
//    titolo: "Creare componenti Angular 2", 
//    autore: "Mario Rossi", 
//    testo: "Creare componenti con Angular 2 è molto semplice.", 
//    numApprezzamenti: 0 
//  }, 
//  { 
//    titolo: "Creare servizi Angular 2", 
//    autore: "Roberto Bianchi", 
//    testo: "Anche creare servizi con Angular 2 è molto semplice.", 
//    numApprezzamenti: 0 
//  }];   
//} 

//getArticoli(): Articolo[] { 
//return this.elencoArticoli; 
//} 

//Attraveros l'api http
constructor(private http: Http) {} 

getArticoli(): Observable<Articolo[]> {
    return this.http
        .get("/api/articoli")
        .map((responseData) => responseData.json()); 
}
  
   
addArticolo(articolo) { 
  this.elencoArticoli.push(articolo)      
} 

}
