import "reflect-metadata";
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: 'AppComponent: {{title}}'
})
export class AppComponent {
  private title:string = 'Hello, World!';
}
