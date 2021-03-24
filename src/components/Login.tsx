import React, {useEffect, useRef} from 'react';
import { useFormik } from "formik";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useOctokit } from "../contexts/OctokitProvider";

export const Login: React.FC = () => {
  const inputELem = useRef<HTMLInputElement>(null);
  const { setToken, error } = useOctokit();

  useEffect(() => {
    if (!inputELem.current) return;
    inputELem.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { login: '' },
    onSubmit: (values) => setToken(values.login),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  }

  return (
    <Container fluid="md" className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Form className="w-50" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control
              id="login"
              name="login"
              type="text"
              placeholder="Enter github login"
              ref={inputELem}
              onChange={formik.handleChange}
            />
            {error && (
              <Form.Text className="text-danger">
                {error}
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
