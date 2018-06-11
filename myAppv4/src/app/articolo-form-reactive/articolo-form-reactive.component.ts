import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Articolo } from '../articolo/articolo.module'; 

@Component( {
    selector: 'articolo-form-reactive',
    templateUrl: './articolo-form-reactive.component.html',
    styleUrls: ['./articolo-form-reactive.component.css']
} )
export class ArticoloFormReactiveComponent implements OnInit {

    myForm2: FormGroup;
    example:any;
    message: string;
    @Input() model: Articolo; 
    
//--[0]
//    constructor() { }

//--[1]
    //    constructor() { 
    //     this.myForm2 = new FormGroup({ 
    //       
    //        txtTitolo: new FormControl(), 
    //        txtAutore: new FormControl(), 
    //        txtTesto: new FormControl() 
    //      });              
    //    } 

// --[2]utilizziamo l aformbuilder più sintetica e di controllo
//    constructor( fb: FormBuilder ) {
//        this.myForm2 = fb.group( {
//            txtTitolo: ["", [Validators.required, Validators.maxLength( 30 )]],
//            txtAutore: ["", [Validators.required, Validators.maxLength( 20 )]],
//            txtTesto: ["", [Validators.required, Validators.minLength( 2000 ), Validators.maxLength( 5000 )]]
//        } );
//    }


//--[3]
constructor(private formBuilder: FormBuilder) { 
  this.myForm2 = formBuilder.group( {
      txtTitolo: ["test1x", [Validators.required, Validators.maxLength( 30 )]],
      txtAutore: ["test2x", [Validators.required, Validators.maxLength( 20 )]],
      txtTesto: ["test3x", [Validators.required, Validators.minLength( 2000 ), Validators.maxLength( 5000 )]]
    });
}


    ngOnInit() {
        //          this.myForm2 =new FormGroup({
        //              txtTitolo: new FormControl("", [ Validators.required, Validators.maxLength(30)] ), 
        //              txtAutore: new FormControl("", [ Validators.required, Validators.maxLength(20)] ), 
        //              txtTesto: new FormControl("", [  Validators.required, Validators.minLength(2000), Validators.maxLength(5000)]) 
        //          }); 
        //          this.myForm2 =new FormGroup({
        //          txtTitolo: new FormControl(), 
        //           txtAutore: new FormControl(), 
        //          txtTesto: new FormControl() 
        //          }); 
        
        // -- [3]          
//        this.myForm2 = this.formBuilder.group({
//            txtTitolo: ["test1", Validators.required ],
//            txtAutore: ["test2", Validators.required ],
//            txtTesto: ["test3", Validators.required ]
//        });
    
       this.example = {
            txtTitolo: "test1",
            txtAutore: "test2",
            txtTesto: "test3"
        };
        this.myForm2 = this.formBuilder.group({
            txtTitolo: [this.example.txtTitolo, Validators.required ],
            txtAutore: [this.example.txtAutore, Validators.required ],
            txtTesto: [this.example.txtTesto, Validators.required ]
        });
            
        //sETTIAMO IL RISULTATO DELLA FORM IN UN'OGGETTO DI DATI
        this.myForm2.valueChanges.subscribe(value => { 
            this.model.titolo = value.txtTitolo; 
            this.model.autore = value.txtAutore; 
            this.model.testo = value.txtTesto; 
          }); 
        
        //Settiam o il singolo parametro della form in un dato
//        this.myForm2.controls["txtTitolo"].valueChanges.subscribe(value => { 
//            this.model.titolo = value; 
//          }); 
    }

    visualizzaArticolo() {
        console.log( "(1)" + JSON.stringify(this.myForm2.value) );
        console.log( "(2)" + this.myForm2.controls["txtTitolo"].value );
        console.log( "(3)" + this.myForm2.controls["txtAutore"].value );
        console.log( "(4)" + this.myForm2.controls["txtTesto"].value );
    }
    
//    onSubmit(form: FormGroup) {
//        //this.message = 'You typed: ' + form.controls.firstName.value;
//        console.log( "(1x)" + JSON.stringify(this.myForm2.value) );
//        console.log( "(2x)" + form.controls["txtTitolo"].value );
//        console.log( "(3x)" + form.controls["txtAutore"].value );
//        console.log( "(4x)" + form.controls["txtTesto"].value );
//        this.message = 'You typed: ' + JSON.stringify(this.myForm2.value);
//    }
    
    onSubmit(form: FormGroup) {
        //this.message = 'You typed: ' + form.controls["txtTitolo"].value;
      console.log( "(1y)" + JSON.stringify(this.myForm2.value) );
      console.log( "(2y)" + form.controls["txtTitolo"].value );
      console.log( "(3y)" + form.controls["txtAutore"].value );
      console.log( "(4y)" + form.controls["txtTesto"].value );
      this.message = 'You typed: ' + JSON.stringify(this.myForm2.value);
    }
    
    doLogin(event) {        
        console.log( "(0x)" + JSON.stringify(event));
        console.log( "(1x)" + JSON.stringify(this.myForm2.value) );
        console.log( "(2x)" + this.myForm2.controls["txtTitolo"].value );
        console.log( "(3x)" + this.myForm2.controls["txtAutore"].value );
        console.log( "(4x)" + this.myForm2.controls["txtTesto"].value );
        this.message = 'You typed: ' + JSON.stringify(this.myForm2.value);
    }

}
