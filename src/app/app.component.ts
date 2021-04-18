import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qr-muni';
  selection: string = "Hello";
  url:string;

  selectURL() {
    this.selection = "url";
  }
}
