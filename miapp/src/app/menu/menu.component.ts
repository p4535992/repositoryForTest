import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ca-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    // definisco 3 proprietà del componente
    link_menu_1:string;
    link_menu_2:string;
    link_menu_3:string;
    isactive: boolean;
  constructor() { 
      this.link_menu_1 = 'Home';
      this.link_menu_2 = 'Chat';
      this.link_menu_3 = 'Contattaci';
      this.isactive = true;
  }

  ngOnInit() {
  }

}
