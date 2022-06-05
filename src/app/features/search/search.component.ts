import { Component, OnInit } from '@angular/core';
import {DataService} from "../../core/services/data.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  title = 'angular-text-search-highlight';
  searchText = '';
  restaurantsList = [];

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
  }

  async onKey(event: any) {
    console.log("CHANGE", event.target.value);

    var searchResult = await this.data.searchRestaurant(this.searchText);
    console.log("searchResult=", searchResult);
    this.restaurantsList  = Object.assign([], searchResult);
  }
}
