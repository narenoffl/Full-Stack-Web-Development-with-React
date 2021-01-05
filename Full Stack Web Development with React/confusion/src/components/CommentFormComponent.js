import React, { Component } from 'react';
import{ Modal, Button, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    state = {
        isModalOpen: false
    };
    toggleModal = () => {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    };

    handleSubmit(values) {
      this.props.postComment(
        this.props.dishId,
        values.select,
        values.name,
        values.textarea
      );
    }

render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          &nbsp;&nbsp;Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="select" md={5}>
                  <strong>Rating</strong>
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".select"
                    id="select"
                    name="select"
                    className="form-control"
                    validators={{
                      required
                    }}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".select"
                    show="touched"
                    messages={{
                      required: "Required "
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  <strong>Your Name</strong>
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be less than 16 characters"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  <strong>Comment</strong>
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".textarea"
                    id="textarea"
                    name="textarea"
                    rows="6"
                    className="form-control"
                 
                  />
                  <Errors
                    className="text-danger"
                    model=".textarea"
                    show="touched" />
                   
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CommentForm;