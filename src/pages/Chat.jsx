import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatContainer from "../components/Chat/ChatContainer";
import Contacts from "../components/Chat/Contacts";
import Welcome from "../components/Chat/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../state/user";

import { io } from "socket.io-client"

function Chat() {

  const host = "http://localhost:8080"
  
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts,setContacts] = useState([])

  const dispatch = useDispatch();
  const user = useSelector(state => state.users)

  useEffect(() => {
    dispatch(checkLogin())
  },[])

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user.id)
    }
  },[user])

  useEffect( () => {
    if (user) {
        axios.get('/api/users')
            .then(res => setContacts(res.data))
    }
  },[])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
