
export class NewUser{
    constructor(
        public email:string,
        public password:string,
        public firstName:string,
        public lastName:string,
        public pseudo:string,
        public accountType:number 
    ){
        this.email=email
        this.password=password
        this.firstName=firstName
        this.lastName=lastName
        this.pseudo=pseudo
        this.accountType=accountType
    }
}