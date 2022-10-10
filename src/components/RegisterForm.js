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
  width: 40%;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: white;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 5px;
  border: none;
`;

const LoginNow = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 98%;
  border: none;
  padding: 15px 20px;
  background-color: #3548fe;
  color: white;
  cursor: pointer;
  border-radius: 30px;
`;

const HaveAccount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const RegisterForm = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstname: state.firstname,
      middlename: state.middlename,
      lastname: state.lastname,
      email: state.email,
      password: state.password,
      cpassword: state.cpassword,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if(res.data.status === 200){
          localStorage.setItem("auth_token", res.data.token)
          localStorage.setItem("auth_name", res.data.username)
          swal("Success", res.data.message, "success");
          navigate('/');
        }else {
          setState({...state, error_list: res.data.validation_errors})
        }
      });
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="First Name"
            type="text"
            onChange={handleInput}
            name="firstname"
            value={state.firstname}
          />
          <Input
            placeholder="Middle Name (optional)"
            onChange={handleInput}
            name="middlename"
            value={state.middlename}
          />
          <Input
            placeholder="Last Name"
            type="text"
            onChange={handleInput}
            name="lastname"
            value={state.lastname}
          />

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

          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={handleInput}
            name="cpassword"
            value={state.cpassword}
          />
          <LoginNow>
            <HaveAccount>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3548FE" }}
              >
                Sign in
              </Link>
            </HaveAccount>
          </LoginNow>
        </Form>
        <Button type="submit" onClick={handleSubmit}>
          REGISTER
        </Button>
      </Wrapper>
    </Container>
  );
};

export default RegisterForm;
