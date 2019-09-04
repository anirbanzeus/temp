import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {
  name = 'Inbox';
  count=0;
  
  constructor() { }

  
  ngOnInit() {
  }

  incrementCount(){
    console.log(this.count);
    this.count++;
  }

}
