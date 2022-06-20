export class UserData {
  constructor (
    public uid:string,
    public accountType:number,
    public email:string,
    public firstName:string,
    public lastName:string,
    public password:string,
    public pseudo:string
    ) {
      this.uid = uid
      this.accountType = accountType
      this.email = email
      this.firstName = firstName
      this.lastName = lastName
      this.password = password
      this.pseudo = pseudo
  }

  accountTypeString():string {
    let typeOfAccount = ["admin", "Utilisateur", "Restaurateur"];
    return typeOfAccount[this.accountType];
  }

  isRestaurateur():boolean {
    return (this.accountType == 2);
  }
}
