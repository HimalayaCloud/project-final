import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Badge } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Fragment>
      <Card
        className="shadow"
        border={
          status === "LEARNED"
            ? "success"
            : status === "LEARNING"
            ? "warning"
            : "danger"
        }
      >
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>
                <p className="post-title">{title}</p>
                <Badge
                  pill
                  bg={
                    status === "LEARNED"
                      ? "success"
                      : status === "LEARNING"
                      ? "warning"
                      : "danger"
                  }
                >
                  {status}
                </Badge>
              </Col>
              <Col className="text-right">
                <ActionButtons url={url} _id={_id} />
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default SinglePost;
