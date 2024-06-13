import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  modalChange(){
    const sidebar = document.getElementById("logo-sidebar");
    const div = document.getElementById("box-sidebar");
    if(sidebar?.classList.contains("-translate-x-full")){
      sidebar?.classList.remove("-translate-x-full", "sm:translate-x-0");
      div?.classList.add("pt-20");
    }else{
      sidebar?.classList.add("-translate-x-full", "sm:translate-x-0");
      div?.classList.remove("pt-20");
    }
  }

  irRuta(){
    const sidebar = document.getElementById("logo-sidebar");
    const div = document.getElementById("box-sidebar");
    sidebar?.classList.add("-translate-x-full", "sm:translate-x-0");
    div?.classList.remove("pt-20");
  }

}
