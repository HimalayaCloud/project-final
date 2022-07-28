import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarMenu from "../layout/NavbarMenu";

const About = () => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row className="mt-5" style={{marginRight:0}}>
        <Col className="text-center">
          <Button variant="primary" href="https://youtube.com/" size="lg">
            Visit my channel for more information
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default About;
