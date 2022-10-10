import { useState } from "react";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Container = styled.div`
  padding: 0 15%;
  background-color: #212121;
  border-bottom: 1px solid #4d4d4d;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
`;

const Left = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  width: 30%;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 200;
  color: white;
  margin-left: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 200;
  color: white;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleError = () => {
    swal("Error", "Please login to post.", "error");
  }

  let AuthButton = "";

  const handleLogout = (e) => {
    axios.post(`/api/logout`).then((res) => {
      e.preventDefault();

      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };

  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <MenuItem style={{ color: "#3548FE" }}>
        <Link to="/login" style={{ textDecoration: "none", color: "#3548FE" }}>
          LOG IN
        </Link>
        <PersonIcon style={{ padding: "0 0 5px 5px", fontSize: "26px" }} />
      </MenuItem>
    );
  } else {
    AuthButton = (
      <MenuItem style={{ color: "#3548FE" }}>
        <Button
          onClick={handleLogout}
          style={{ textDecoration: "none", color: "#3548FE" }}
        >
          LOGOUT
        </Button>
        <PersonIcon style={{ padding: "0 0 5px 5px", fontSize: "26px" }} />
      </MenuItem>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo src="https://res.cloudinary.com/dmbpo49ak/image/upload/v1665253671/popular%20items/BABE/%D0%A0%D0%B5%D1%81%D1%83%D1%80%D1%81_1_1_ct14mz.png" />
        </Left>
        <Right>
          <Menu>
            <MenuItem>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                MAIN
              </Link>
            </MenuItem>
            <MenuItem>
              {!localStorage.getItem("auth_token") ? (
                <Link onClick={handleError} to="/" style={{ textDecoration: "none", color: "white" }}>
                  POSTS
                </Link>
              ) : (
                <Link
                  to="/post"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  POSTS
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              <Link to="/contact" style={{ textDecoration: "none", color: "white" }}>
                CONTACTS
              </Link>
            </MenuItem>
            {AuthButton}
          </Menu>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
