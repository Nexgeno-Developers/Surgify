import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-summary',
  templateUrl: './blog-summary.component.html',
  styleUrls: ['./blog-summary.component.css']
})
export class BlogSummaryComponent implements OnInit {

  @Input()
  blog: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
