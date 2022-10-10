import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import swal from 'sweetalert'

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #4d4d4d;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 35%;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: white;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #3548fe;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  font-weight: 600;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const RegisterNow = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const LoginFOrm = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: state.email,
      password: state.password,
      error_list: [],
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token)
          localStorage.setItem("auth_name", res.data.username)
          swal("Success", res.data.message, "success");
          navigate('/');
        } else {
          swal("Warning", res.data.message, "warning");
        } 
        // else {
        //   setState({...state, error_list: res.data.validation_errors})
        // }
      });
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input
            placeholder="Email"
            type="text"
            onChange={handleInput}
            name="email"
            value={state.email}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={handleInput}
            name="password"
            value={state.password}
          />
          <LinkContainer>
            <RegisterNow>
              Don't you have an account?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#3548FE" }}
              >
                Sign up
              </Link>
            </RegisterNow>
          </LinkContainer>
          <Button onClick={handleSubmit}>LOG IN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginFOrm;
