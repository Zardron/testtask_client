import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";
import { format } from "date-fns";

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

const Input = styled.textarea`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  resize: none;
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
  margin-top: 10px;
`;

const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    timestamp: format(new Date(), "MM.dd.yyyy HH:MM"),
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const data = {
      name: state.name,
      email: state.email,
      message: state.message,
    };

    if (data.post === "") {
      swal("Error", "You cannot post with blank value.", "error");
    }

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/sendmail`, data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
        } else {
          swal("Warning", res.data.validation_errors, "Warning");
        }
      });
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CONTACT</Title>
        <Form>
          <Input
            placeholder="Name"
            type="text"
            onChange={handleInput}
            name="name"
            required
            value={state.name}
          />
          {state.name === "" ? (
            <span style={{ color: "red" }}>Name is mandatory field</span>
          ) : (
            ""
          )}

          <Input
            placeholder="Email"
            type="text"
            onChange={handleInput}
            name="email"
            required
            value={state.email}
          />
          {state.email === "" ? (
            <span style={{ color: "red" }}>Email is mandatory field</span>
          ) : (
            ""
          )}

          <Input
            placeholder="Message"
            onChange={handleInput}
            name="message"
            value={state.message}
            rows="5"
            required
          />
          {state.message === "" ? (
            <span style={{ color: "red", marginBottom: "10px" }}>Message is mandatory field</span>
          ) : (
            ""
          )}

          <Button
            onClick={handleSubmit}
          >
            SEND MESSAGE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ContactForm;
