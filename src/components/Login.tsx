import React, {useEffect, useRef} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useFormik} from "formik";

export const Login: React.FC = () => {
  const inputELem = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputELem.current) return;
    inputELem.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { login: '' },
    onSubmit: (values) => console.log(values),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  }

  return (
    <Container fluid="md" className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Form className="w-50" onSubmit={onSubmit}>
          <Form.Group controlId="Login">
            <Form.Label>Login</Form.Label>
            <Form.Control

              type="text"
              placeholder="Enter github login"
              ref={inputELem}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
