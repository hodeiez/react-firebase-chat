import {signInWithGoogle, signOutWithGoogle} from './../firebase/auth'

export function SignIn(){
  
    return(
    
      <button onClick={signInWithGoogle}>Sign in with Google</button>
     
      )
  }
 export function SignOut(){
  
    return (
      <a onClick={()=>signOutWithGoogle()}>Sign out</a>
    )
  }