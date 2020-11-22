import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caff-item',
  templateUrl: './caff-item.component.html',
  styleUrls: ['./caff-item.component.scss']
})
export class CaffItemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
