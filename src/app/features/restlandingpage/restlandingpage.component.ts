import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-restlandingpage',
  templateUrl: './restlandingpage.component.html',
  styleUrls: ['./restlandingpage.component.css']
})
export class RestlandingpageComponent implements OnInit {
  public restaurants:any
 
  constructor(
    private data:DataService,
    private route:ActivatedRoute

  ) {
    this.restaurants = this.getRest()
    console.log(this.restaurants)

   }

  ngOnInit(): void {
  } 
  async getRest(){
    this.restaurants = await this.data.getSingleRestaurant(this.route.snapshot.paramMap.get('name')!)
    return this.restaurants
  }


}
