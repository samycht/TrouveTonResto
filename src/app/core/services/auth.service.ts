import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from '@angular/fire/auth';
import {RegisterData} from '../interfaces/register-data.interfaces';
import {LoginData} from '../interfaces/login-data.interfaces';
import {Firestore,collection,setDoc,doc, query,where, getDocs} from '@angular/fire/firestore';
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
    ) { }

  login({email,password}:LoginData){
    return signInWithEmailAndPassword(this.auth,email,password);
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
  email!:string;
  firstName!:string;
  lastName!:string;
  password!:string;
  pseudo!:string;

  getAuth = getAuth();
  checkLogIn(){
    if(this.auth.currentUser==null){
        this.router.navigate(['/'])
    }
  }


  async getInfo() {

    const usersRef = collection(this.db, "users");
    const q = query(usersRef, where(documentId(), "==", this.uid));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs[0].data();
    
    
    this.accountType = user['accountType'];
    this.email = user['email'];
    this.firstName = user['firstName'];
    this.lastName = user['lastName'];
    this.password = user['password'];
    this.pseudo = user['pseudo'];

  }

  



}
