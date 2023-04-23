import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const GetBlog = (props) => {
  return (
    <>
      <Card style={{ width: "18rem", marginTop: "1rem" }}>
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>{props.data.body}</Card.Text>
          <Button
            variant="primary badge me-2  rounded-pill"
            rounded-pill
            onClick={() => props.updateBlog(props.data)}
          >
            Update
          </Button>
          <Button
            variant="danger badge  rounded-pill"
            onClick={() => props.deleted(props.data.id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default GetBlog;
