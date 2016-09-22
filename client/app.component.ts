import "reflect-metadata";
import { Component, OnInit, NgZone } from '@angular/core';
import { Things, Thing } from '../collections';
import { Observable } from 'rxjs';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent implements OnInit {
  private title:string = 'Hello, World!';
  private message:string = '';
  private things:Thing[] = [];
  private newThing:string;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    Things.find({}).zone().subscribe({
      next: things => {
        console.log("Got things:", things);
        this.things = things;
      }
    });
  }

  addThing() {
    let thing: Thing = {
      name: this.newThing
    };
    Things.insert(thing).debounce(() => Observable.interval(500)).zone().subscribe({
      next: (id) => this.message = 'Inserted new doc with _id: ' + id,
      complete: () => this.message = 'Inserting complete',
      error: (err) => this.message = 'error while inserting doc: ' + err
    });
  }

  removeThing(thing: Thing) {
    Things.remove({_id: thing._id}).zone().subscribe({
      complete: ()=> this.message = 'remove complete'
    });
  }
}
