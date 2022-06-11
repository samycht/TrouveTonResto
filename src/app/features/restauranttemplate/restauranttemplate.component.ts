import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
@Component({
  selector: 'app-restauranttemplate',
  templateUrl: './restauranttemplate.component.html',
  styleUrls: ['./restauranttemplate.component.css']
})
export class RestauranttemplateComponent implements OnInit {
  
  @Input()public restaurants:any
  constructor(
    private storage:StorageService
  ) { }

  ngOnInit(): void {
  }
  async delete(id:string){
    await  this.storage.delRestaurant(id)
    window.location.reload()
  }
}
