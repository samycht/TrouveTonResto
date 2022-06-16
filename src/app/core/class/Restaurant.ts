export interface RestaurantData{
    name:string;
    description:string;
    address:string;
    city:string;
    state:string;
    zip:string;
    phone:string;
}

export class Restaurant{
    constructor(
        public name:string,
        public description:string,
        public address:string,
        public city:string,
        public state:string,
        public zip:string,
        public phone:string

    ){
        this.name=name
        this.description=description
        this.address=address
        this.city=city
        this.state=state
        this.zip=zip
        this.phone=phone
    }
}