import { useCollectionData } from "react-firebase-hooks/firestore";

import { orderByDate, textMessage } from "./../firestore/collections";

import React, { useState, useRef, useEffect } from "react";

//for messages
import { Comment, Avatar } from "antd";
//styles for messages
const commentsStyle={borderRadius:"2%",padding:"1%",marginBottom:"2%",}
  const currentAuthStyle={...commentsStyle,backgroundColor:'DarkGrey',marginLeft:"50%"}
  const otherAuthStyle={...commentsStyle,backgroundColor:'Violet',width:"50%"}

export function MainPage({ auth }) {
  const [messages] = useCollectionData(orderByDate, { idField: "id" });

  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
  
    <h1>Simple chat</h1>
      <div className="scrollable-container">
        

        <div style={{ margin: "0" }}>
          {messages &&
            messages.map((txt) => (
              <TextMessage key={txt.id} message={txt} auth={auth}></TextMessage>
            ))}
        </div>
        <div ref={bottomRef} />
      </div>
      <WriteMessage />
    
 
    </>
  );
}

//TODO: REFRACTOR ALL STYLING MESS
export function TextMessage({ message, auth }) {
  const { text, uid, displayName, photoURL } = message;
  

  return auth.currentUser.uid === uid ? (
    <Comment  style={currentAuthStyle}
      author={<h5 style={{  display:"inline-block"}}>{displayName}</h5>}
      avatar={
        <Avatar
          
          src={
            <img
              src={auth.currentUser.photoURL}
              className="avatar-rounded"
              alt="avatar"
            />
          }
          preview={false}
          alt="avatar"
        />
      }
      content={text}
    ></Comment>
  ) : (
   
      <Comment style={otherAuthStyle}
        author={<h5 >{displayName}</h5>}
        avatar={
          <Avatar
          
            src={<img src={photoURL} className="avatar-rounded" alt="avatar" />}
            preview={false}
            alt="avatar"
          />
        }
        content={text}
      ></Comment>
   
  );
}

export function WriteMessage() {
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    textMessage(formValue);
    setFormValue("")
  };

  return (
    <form onSubmit={sendMessage}>
      <input
      style={{width:"100%"}}
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        type="text"
      />
    </form>
  );
}
