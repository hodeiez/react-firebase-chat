import React, {useState} from 'react';
import './App.css';
import {firebaseInit, auth} from './conf/firebaseConf'
import firebase from 'firebase/app'
import { messageRef, orderByDate} from './firestore/collections'

import {signInWithGoogle, signOutWithGoogle} from './firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'



function SignIn(){
  
  return(
  
    <button onClick={signInWithGoogle}>Sign in with Google</button>
   
    )
}
function SignOut(){

  return (
    <button onClick={()=>signOutWithGoogle()}>Sign out</button>
  )
}


function MainPage(){

const [messages] =useCollectionData(orderByDate, {idField:'id'})

return(
    <>
      <h1>mainPage</h1>
    <div>
{messages && messages.map(txt =><TextMessage key={txt.id} message={txt}></TextMessage>)}
    </div>
    <WriteMessage/>
    <SignOut />
    
    </>
  )
}
function TextMessage({message}){
  const{text, uid}=message
  return <p><strong>{text}</strong> with id: {uid}</p>
}


function WriteMessage(){
 
  const[formValue, setFormValue]=useState('')

  const sendMessage= async(e)=>{
    e.preventDefault();
    const {uid} = auth.currentUser;
    await messageRef.add({
      text: formValue,
      date: firebase.firestore.FieldValue.serverTimestamp(), uid
    })
  }

  return(
    <form onSubmit={sendMessage}>
    <input value={formValue}  onChange={(e)=>setFormValue(e.target.value)} type="text"/>
    <button type="submit">S</button>
    </form>
  )
}



function App() {
  //fireabase auth
  const [user]=useAuthState(auth)


  return (
    <div className="App">



      <header className="App-header">
     <div>
        {user?<MainPage/>:<SignIn/>}
      </div>
 
 
      </header>
    </div>
  );
}

export default App;