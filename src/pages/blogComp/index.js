import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import GetBlog from "../getBlog";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class BlogComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: [],
      blogPosts: {
        id: 1,
        title: "",
        body: "",
        userId: 1,
      },
      isUpdate: false,
    };
  }

  getBlogData = () => {
    axios.get("http://localhost:3004/posts").then((result) => {
      this.setState({
        datas: result.data,
        blogPosts: {
          id: 1,
          title: "",
          body: "",
          userId: 1,
        },
      });
    });
  };

  postBlog = (e) => {
    const times = new Date().getTime();
    const targets = { ...this.state.blogPosts };
    targets[e.target.name] = e.target.value;
    if (!this.state.isUpdate) {
      targets["id"] = times;
    }
    this.setState({
      blogPosts: targets,
    });
  };

  postToApi = () => {
    axios
      .post("http://localhost:3004/posts", this.state.blogPosts)
      .then((result) => {
        this.getBlogData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateToApi = () => {
    axios
      .put(
        `http://localhost:3004/posts/${this.state.blogPosts.id}`,
        this.state.blogPosts,
        this.setState({
          isUpdate: false,
          blogPosts: {
            id: 1,
            title: "",
            body: "",
            userId: 1,
          },
        })
      )
      .then((res) => {
        this.getBlogData();
      });
  };

  updateBlogPost = (data) => {
    this.setState({
      blogPosts: data,
      isUpdate: true,
    });
  };

  blogSubmit = () => {
    if (this.state.isUpdate) {
      this.updateToApi();
    } else {
      this.postToApi();
    }
  };

  componentDidMount() {
    this.getBlogData();
  }

  deleteBlog = (id) => {
    axios.delete(`http://localhost:3004/posts/${id}`).then((res) => {
      this.getBlogData();
    });
  };

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col md={6}>
              <h3 className="my-5">Tuliskan Apapun Yang ingin kalian Mau</h3>
              <Form className="my-5">
                <Form.Group cqlassName="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    onChange={this.postBlog}
                    value={this.state.blogPosts.title}
                  />
                </Form.Group>
                <Form.Group className="mt-2 mb-4">
                  <Form.Label>Body :</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="body"
                    onChange={this.postBlog}
                    value={this.state.blogPosts.body}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => this.blogSubmit()}
                >
                  Submit
                </Button>
              </Form>
              <h3 className="my-5">Hasil</h3>
              {this.state.datas.map((res, i) => {
                return (
                  <GetBlog
                    key={i}
                    data={res}
                    deleted={this.deleteBlog}
                    updateBlog={this.updateBlogPost}
                  />
                );
              })}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
