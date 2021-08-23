
import firebase from 'firebase/app'
import { auth} from './../conf/firebaseConf'

export const signInWithGoogle=()=>{
    const provider=new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)}

  
export const signOutWithGoogle=()=>{

    return auth.currentUser && auth.signOut();
}
