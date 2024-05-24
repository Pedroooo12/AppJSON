import { Component, OnInit } from '@angular/core';
import { ItemsMenu } from '../../interfaces/itemsMenu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  itemsData: ItemsMenu[] = [
    {
      name: 'prueba',
      position: 1
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  cambiarData(position: number){
    console.log(position);
  }

}
