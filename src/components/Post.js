import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

const Container = styled.div`
  padding: 0 15%;
`;

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const Title = styled.h1`
  margin: 30px 0 10px 0;
`;

const PostsContainer = styled.div`
  flex: 1;
  flex-direction: column;
`;

const Posts = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f3f7;
  padding: 20px;
  margin: 20px 0;
`;

const Info = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  color: #3548fe;
  font-size: 16px;
  font-weight: 600;
`;

const Time = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #959595;
`;

const Post = () => {
  const [state, setState] = useState([]);

  console.log(state);

  useEffect(() => {
    axios.get(`api/viewpost`).then((res) => {
      if (res.status === 200) {
        setState(res.data.post);
        console.log(res.data.post);
      }
    });
  }, [state]);

  return (
    <Container>
      <Wrapper>
        <Title>POSTS</Title>
        <PostsContainer>
          {state.map((item) => (
            <Posts>
              <Info>{item.post}</Info>
              <Time>{item.timestamp}</Time>
            </Posts>
          ))}
        </PostsContainer>
      </Wrapper>
    </Container>
  );
};

export default Post;
