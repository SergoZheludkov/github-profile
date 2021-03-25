import React from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useOctokit } from "../contexts/OctokitProvider";

export const Profile: React.FC = () => {
  const history = useHistory();
  const { user: { name, blog, bio }, logout, update } = useOctokit();

  const initialValues = { name, blog, bio };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => update(values),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  }

  return (
    <Container fluid="md" className="h-100">
      <Row className="h-100 flex-column flex-nowrap align-items-center justify-content-start">
        <Row className="w-50 align-items-center justify-content-between my-5 pb-2 border-bottom">
          <Row className="flex-column flex-nowrap align-items-center ml-0">
            <h3>Profile</h3>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => history.push('/repos')}
            >
              your repos
            </Button>
          </Row>
          <Button
            variant="danger"
            size="lg"
            onClick={logout}
          >
            Logout
          </Button>
        </Row>
        <Form className="w-50" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Blog</Form.Label>
            <Form.Control
              id="blog"
              name="blog"
              type="text"
              placeholder="Enter text"
              value={formik.values.blog}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              id="bio"
              name="bio"
              as="textarea"
              rows={4}
              placeholder="Enter your bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
