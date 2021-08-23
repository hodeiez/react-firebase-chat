import { firestore} from './../conf/firebaseConf'

//refs
export const messageRef =firestore.collection('messages');



//queries
export const orderByDate=messageRef.orderBy('date')
