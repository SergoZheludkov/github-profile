import React from 'react';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <Container fluid="md" className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Row className="w-50 flex-column align-items-center justify-content-between my-5 pb-2">
          <Row className="flex-column align-items-center justify-content-between my-5">
            <h1>404</h1>
            <h3>Page not found</h3>
          </Row>
          <Button onClick={() => history.push('/profile')}>
            Profile
          </Button>
        </Row>
      </Row>
    </Container>
  );
}
