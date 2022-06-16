import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut , setPersistence,browserSessionPersistence} from '@angular/fire/auth';
import {NewUser} from '../class/NewUser';
import { RegisteredUser} from '../class/RegisteredUser';
import {Firestore, collection, setDoc, doc, query, where, getDocs, getDoc} from '@angular/fire/firestore';
import {getAuth } from "@angular/fire/auth";
import {Router} from '@angular/router'
import { documentId } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router : Router
    ) {
      if(this.auth.currentUser){
        this.uid = this.auth.currentUser.uid;
      }
  }

  uid!:string;
  accountType!:number;
  accountTypeString!:string;
  email!:string;
  firstName!:string;
  lastName!:string;
  password!:string;
  pseudo!:string;

   async login(registeredUser:RegisteredUser){

     return await this.auth.setPersistence(browserSessionPersistence).then(()=>{
       signInWithEmailAndPassword(this.auth,registeredUser.email,registeredUser.password)
     }).catch((e)=>{
       console.log(e)
     })
  }

  async register(newUser:NewUser){
    return await createUserWithEmailAndPassword(this.auth,newUser.email,newUser.password).then((data)=>

      setDoc(doc(this.db,"users",data.user.uid),{

        email:newUser.email,
        password:newUser.password,
        firstName:newUser.firstName,
        lastName:newUser.lastName,
        pseudo:newUser.pseudo,
        accountType:newUser.accountType
      }).catch(error => {
        console.log('Something went wrong with added user to firestore: ', error);
    })
    );
  }
  logout(){
    return signOut(this.auth);
  }

  getAuth = getAuth();

  checkLogIn(){
    if(this.auth.currentUser==null){
        this.router.navigate(['/'])
    }
  }

  async getInfo() {
    if(this.auth.currentUser){
      this.uid = this.auth.currentUser.uid;
    }
    console.log(this.uid);
    const docRef = doc(this.db, "users", this.uid);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();

    if (user) {
      this.accountType = user['accountType'];
      this.email = user['email'];
      this.firstName = user['firstName'];
      this.lastName = user['lastName'];
      this.password = user['password'];
      this.pseudo = user['pseudo'];
      this.accountTypeString = this.accountNbToString(this.accountType);
    }
  }

  accountNbToString(nb: number):string {
    let typeOfAccount = ["admin", "Utilisateur", "Restaurateur"];
    return typeOfAccount[nb];
  }

  isRestaurateur():boolean {
    if(this.accountType == 2) {
      return true;
    } else {
      return false;
    }
  }

}
