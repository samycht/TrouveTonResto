export interface FavoriteData{
  user_id:string;
  restaurant_id:string;
}

export class Favorite{
  constructor(
    public user_id:string,
    public restaurant_id:string
  ){
    this.user_id = user_id;
    this.restaurant_id = restaurant_id;
  }

  getFavoriteid():string{
    return this.user_id + this.restaurant_id;
  }

}
