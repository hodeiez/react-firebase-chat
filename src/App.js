import React from 'react';
import './App.css';

import { auth} from './conf/firebaseConf'
import { SignIn } from './components/signInOut';
import {useAuthState} from 'react-firebase-hooks/auth'
import {MainPage} from './components/chat'
 

function App() {
  //fireabase auth
  const [user]=useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">

     <div>
        {user?<MainPage auth={auth}/>:<SignIn />}
      </div>
 
 
      </header>
    </div>
  );
}

export default App;