import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  selection: string = "Hello";
  url:string;

  constructor() { }

  ngOnInit(): void {
  }
  
  selectURL() {
    this.selection = "url";
  }
}
