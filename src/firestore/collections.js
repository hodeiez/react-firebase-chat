import { auth,firestore} from './../conf/firebaseConf'
import firebase from 'firebase/app'
//refs
export const messageRef =firestore.collection('messages');



//queries
export const orderByDate=messageRef.orderBy('date')


//actions
export const textMessage= (formValue)=>{
    const {uid} = auth.currentUser;
    const {displayName}=auth.currentUser;
     messageRef.add({
      text: formValue,
      date: firebase.firestore.FieldValue.serverTimestamp(), uid, displayName
    })
  }