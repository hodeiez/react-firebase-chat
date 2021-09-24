import { useCollectionData } from "react-firebase-hooks/firestore";
import { Profile } from "./profile";
import { orderByDate, textMessage } from "./../firestore/collections";
import { SignOut } from "./signInOut";
import React, { useState, useRef, useEffect } from "react";

//for messages
import { Layout, Comment, Image, Row, Col, Avatar } from "antd";

const { Content } = Layout;

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
      <SignOut />
      <Profile auth={auth} />
    </>
  );
}

//TODO: REFRACTOR ALL STYLING MESS
export function TextMessage({ message, auth }) {
  const { text, uid, displayName, photoURL } = message;
  const commentsStyle={borderRadius:"5%",padding:"1%",marginBottom:"2%",wordWrap: "break-word"}
  const currentAuthStyle={...commentsStyle,backgroundColor:'DarkGrey',marginLeft:"50%"}
  const otherAuthStyle={...commentsStyle,backgroundColor:'Black',width:"50%"}
  return auth.currentUser.uid === uid ? (
    <Comment style={currentAuthStyle}
      author={<h5 style={{  display:"inline-block"}}>{displayName}</h5>}
      avatar={
        <Avatar
          style={{ display:"inline-block",
          float: "left"}}
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
    <Content>
      <Comment style={otherAuthStyle}
        author={<h5 style={{  display:"inline-block"}}>{displayName}</h5>}
        avatar={
          <Avatar
          style={{ display:"inline-block",
          float: "left"}}
            src={<img src={photoURL} className="avatar-rounded" alt="avatar" />}
            preview={false}
            alt="avatar"
          />
        }
        content={text}
      ></Comment>
    </Content>
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
