import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut , setPersistence,browserSessionPersistence,onAuthStateChanged} from '@angular/fire/auth';
import {RegisterData} from '../interfaces/register-data.interfaces';
import {LoginData} from '../interfaces/login-data.interfaces';
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
     
    }

      
  async login({email,password}:LoginData){

     return await this.auth.setPersistence(browserSessionPersistence).then(()=>{
       signInWithEmailAndPassword(this.auth,email,password)
     }).catch((e)=>{
       console.log(e)
     })    
  }
  async register({email,password,firstName,lastName,pseudo,accountType}:RegisterData){
    return await createUserWithEmailAndPassword(this.auth,email,password).then((data)=>


      setDoc(doc(this.db,"users",data.user.uid),{

        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName,
        pseudo:pseudo,
        accountType:accountType
      }).catch(error => {
        console.log('Something went wrong with added user to firestore: ', error);
    })
    );
  }
  logout(){
    
    return signOut(this.auth);
  }
  

  uid!:string;
  accountType!:number;
  accountTypeString!:string;
  email!:string;
  firstName!:string;
  lastName!:string;
  password!:string;
  pseudo!:string;
  





  
  
  checkLogIn(){
    onAuthStateChanged(getAuth(),(user)=>{
      if(user){
        this.uid=  user.uid

      }
      else{
        this.router.navigate(['/'])
      }
    })

  }

  async getUid(){
    onAuthStateChanged(getAuth(),(user)=>{
      if(user){
        this.uid = user.uid;
       
      }
      else{
        console.log("No user")
      }
    }
    )
    
    
  }
  
  async getInfo() {
   
    const auth = getAuth();
    onAuthStateChanged(auth,async  (user)=>{
      if(user){
        this.uid = user.uid;
        const docRef = doc(this.db, "users", this.uid);
        const docSnap = await getDoc(docRef);
    
        const UserData = docSnap.data()!;

        this.accountType = UserData['accountType'];
        this.email = UserData['email'];
        this.firstName = UserData['firstName'];
        this.lastName = UserData['lastName'];
        this.password = UserData['password'];
        this.pseudo = UserData['pseudo'];
        this.accountTypeString = this.accountNbToString(this.accountType);

      }
      else{
        console.log("User does not exist ! ");
      }
    })


  }


  accountNbToString(nb: number):string {
    let typeOfAccount = ["admin", "Utilisateur", "Restaurateur"];
    return typeOfAccount[nb];
  }


}
