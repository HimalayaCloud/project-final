/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import NavbarMenu from "../layout/NavbarMenu";
import { PostsContext } from "../../contexts/PostContext";
import { useContext } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/esm/Card";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import { OverlayTrigger, Toast, Tooltip } from "react-bootstrap";
import UpdatePostModal from "../posts/UpdatePostModal";

const Dashboard = () => {
  // Context
  const {
    authState: { user: username },
  } = useContext(AuthContext);
  // Post Context
  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostsContext);

  // Start: get all posts
  // console.log(posts);

  useEffect(() => {
    getPosts();
  }, []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Learnit</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col key={post._id} className="my-2">
                <SinglePost post={post}></SinglePost>
              </Col>
            );
          })}
        </Row>
        {/* Open Add Post modal*/}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add new things to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60"></img>
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      <NavbarMenu></NavbarMenu>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show Toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: "", type: null })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
