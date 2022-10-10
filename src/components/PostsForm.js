import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import swal from 'sweetalert'
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
`;

const Post = () => {

  const [state, setState] = useState({
    post: "",
    timestamp: format(new Date(), "MM.dd.yyyy HH:MM"),
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    


    const data = {
      post: state.post,
      timestamp: state.timestamp,
    };

    if(data.post === ""){
      swal("Error", "You cannot post with blank value.", "error");
    }

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/post`, data).then((res) => {
        if(res.data.status === 200){
            swal("Success", res.data.message, "success");
          }else {
            swal("Warning", res.data.validation_errors, "Warning");
          }
      });
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>ADMIN</Title>
        <Form>
          <Input
            placeholder="POST"
            onChange={handleInput}
            name="post"
            value={state.post}
            rows="10"
          />
          <Button onClick={handleSubmit}>ADD</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Post;
