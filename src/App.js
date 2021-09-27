import React from 'react';
import './App.css';

import { auth} from './conf/firebaseConf'
import { SignIn } from './components/signInOut';
import {useAuthState} from 'react-firebase-hooks/auth'
import {MainPage} from './components/chat'
import TopMenu  from './components/TopMenu'
 

function App() {
  //fireabase auth
  const [user]=useAuthState(auth)

  return (
    <>
   
     <div class="">
       {/*}<TopMenu auth={auth}/>
    {user?<MainPage auth={auth}/>:<SignIn />} {*/}
    {user?<TopMenu auth={auth}/>:<SignIn />}
      </div>
 </>
 
     
  );
}

export default App;