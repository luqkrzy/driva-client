import { Component, OnInit } from '@angular/core';

export interface Tile {
  text: string,
  cols: number,
  rows: number,
  color: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
