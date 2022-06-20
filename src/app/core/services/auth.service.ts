import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut ,onAuthStateChanged, setPersistence,browserSessionPersistence,browserLocalPersistence} from '@angular/fire/auth';
import {NewUser} from '../class/NewUser';
import { RegisteredUser} from '../class/RegisteredUser';
import {Firestore, collection, setDoc, doc, query, where, getDocs, getDoc} from '@angular/fire/firestore';
import {getAuth } from "@angular/fire/auth";
import {Router} from '@angular/router'
import { UserData } from '../class/UserData';
import { User } from 'firebase/auth';
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

  async login(registeredUser:RegisteredUser) {
    setPersistence(getAuth(),browserLocalPersistence).then(()=>  signInWithEmailAndPassword(this.auth,registeredUser.email,registeredUser.password))
    console.log((await signInWithEmailAndPassword(this.auth,registeredUser.email,registeredUser.password)).user)
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
    return signOut(this.auth).then(()=>location.reload());
  }

  getUser() {
    return new Promise<User>((resolve,reject)=>{
      onAuthStateChanged(getAuth(),(user)=>{
        if(user){
          resolve(user)
        }
      })
    })
  }

  checkLogIn(){
    if(this.auth.currentUser==null){
        this.router.navigate(['/'])
    }
  }

  async getInfo(userID:string) {

    var userData = new UserData(userID,0,"","","","","");

    const docRef = doc(this.db, "users", userID);
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();

    if (userDoc) {
      userData.accountType = userDoc['accountType'];
      userData.email = userDoc['email'];
      userData.firstName = userDoc['firstName'];
      userData.lastName = userDoc['lastName'];
      userData.password = userDoc['password'];
      userData.pseudo = userDoc['pseudo'];
    }
    return userData
  }

}
