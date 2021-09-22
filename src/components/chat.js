import {useCollectionData} from 'react-firebase-hooks/firestore'
import {Profile} from './profile'
import { orderByDate, textMessage} from './../firestore/collections'
import { SignOut } from './signInOut';
import React, {useState} from 'react';
export function MainPage({auth}){

    const [messages] =useCollectionData(orderByDate, {idField:'id'})
    
    return(
        <>
          <h1>Simple chat</h1>
        <div>
    {messages && messages.map(txt =><TextMessage key={txt.id} message={txt} auth={auth}></TextMessage>)}
        </div>
        <WriteMessage/>
        <SignOut />
        <Profile auth={auth}/>
        </>
      )
    }
    
    //style this
   export function TextMessage({message, auth}){
      const{text, uid, displayName}=message
      
      return((auth.currentUser.uid===uid)?<p>you <strong>{text}</strong></p>:<p>{displayName} says: <strong>{text}</strong></p>)
    }
    
    
  export  function WriteMessage(){
     
      const[formValue, setFormValue]=useState('')
    
      const sendMessage= async(e)=>{
        e.preventDefault();
        textMessage(formValue)
      
         
      } 
    
    
      return(
        <form onSubmit={sendMessage}>
        <input value={formValue}  onChange={(e)=>setFormValue(e.target.value)} type="text"/>
        <button type="submit">S</button>
        </form>
      )
    }