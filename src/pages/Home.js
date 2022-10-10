import React from "react";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Post from "../components/Post";

const Home = () => {
  return (
    <>
      <Navbar />
      <Main />
      <Post />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
