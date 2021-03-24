import React from 'react';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const Repos: React.FC = () => {
  const history = useHistory();

  return (
    <Container fluid="md" className="h-100">
      <Row className="h-100 align-items-start justify-content-center">
        <Row className="w-50 align-items-center justify-content-between my-5 pb-2 border-bottom">
          <h3>Users Repo</h3>
          <Button onClick={() => history.push('/profile')}>
            Back
          </Button>
        </Row>
      </Row>
    </Container>
  );
}
