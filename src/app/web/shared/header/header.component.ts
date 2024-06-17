import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  modalChange(){
    this.isVisible = !this.isVisible;    
    const sidebar = document.getElementById("logo-sidebar");
    const div = document.getElementById("box-sidebar");
    if(this.isVisible){
      sidebar?.classList.remove("-translate-x-full");
      div?.classList.add("pt-20");
    }else{
      div?.classList.remove("pt-20");
      sidebar?.classList.add("-translate-x-full");
    }

  }

  irRuta(){
    const sidebar = document.getElementById("logo-sidebar");
    const div = document.getElementById("box-sidebar");
    sidebar?.classList.add("-translate-x-full", "sm:translate-x-0");
    div?.classList.remove("pt-20");
  }

}
