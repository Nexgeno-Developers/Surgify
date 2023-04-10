import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simplify-surgeries',
  templateUrl: './simplify-surgeries.component.html',
  styleUrls: ['./simplify-surgeries.component.css']
})
export class SimplifySurgeriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0, behavior: 'smooth', left: 0
    });
  }

}
