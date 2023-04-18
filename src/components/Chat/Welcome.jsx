import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import welcomeGif from "../../assets/chat/robot.gif"


export default function Welcome() {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`/api/users/me`).then((res) => setUser(res.data));
  }, []);

  return (
    <Container>
      <img src={welcomeGif} alt="" />
      <h1>
        Welcome,{" "}
        <span>
          {user.name} {user.lastname}!
        </span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
