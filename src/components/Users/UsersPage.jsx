import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import UserCard from "../../common/Card/UserCard";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";
import { fetchApi } from "../../config/axiosInstance";
import { useTranslation } from "react-i18next";

function Users() {

  const [t,i18n] = useTranslation("global");

  const [users, setUsers] = useState([]);
  const [placeholder, setPlaceholder] = useState(`${t("users.search")}`);

  const search = useInput();

  //input
  const togglePlaceholder = function () {
    setPlaceholder("");
  };

  //search users
  const fetchSearch = async () => {
    const res = await fetchApi({
      method: "get",
      url: `/api/users/search?name=${search.value}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log(res)

    setUsers(res.data);
    return res.data;
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchSearch();
    }
  };

  //Users
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchApi({
        method: "get",
        url: "/api/users/",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setUsers(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Input
          autocorrect="off"
          maxlength="50"
          placeholder={placeholder}
          autocapitalize="sentences"
          onFocus={togglePlaceholder}
          onKeyDown={handleSearch}
          {...search}
        />
      </Container>

      <SimpleGrid minChildWidth="300px" spacing="30px">
        {users.map((user, i) => (
          <UserCard user={user} key={i} />
        ))}
      </SimpleGrid>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Input = styled.input`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  height: 68px;
  letter-spacing: 0px;
  outline: none;
  padding-left: 48px;
  width: 1629px;
  border-color: rgba(255, 255, 255, 0.4);
  background-color: #131728;
  text-align: center;

  &::placeholder {
    color: #fff;
  }
`;

export default Users;
