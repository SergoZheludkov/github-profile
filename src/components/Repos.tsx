import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { useRepos } from "../contexts/ReposProvider";

const updateTime = 10000;

export const Repos: React.FC = () => {
  const history = useHistory();
  const { repos, error, update } = useRepos();

  useEffect(() => {
    const timerId = setTimeout(() => update(), updateTime);
    return () => clearTimeout(timerId);
  });

  const renderTable = () => (
    <Row className="w-50 align-items-center justify-content-between">
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Repo name</th>
            <th>Language</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(({ name, language, stars }, index ) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{name}</th>
              <th>{language}</th>
              <th>️{`${stars}⭐`}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );

  const getError = () => (
    <Row className="w-50 align-items-center justify-content-center text-danger">
      <h1>{error}</h1>
    </Row>
  );

  return (
    <Container fluid="md" className="h-100">
      <Row className="h-100 flex-column flex-nowrap align-items-center justify-content-start">
        <Row className="w-50 align-items-center justify-content-between my-5 pb-2 border-bottom">
          <h3>Users Repo</h3>
          <Button onClick={() => history.push('/profile')}>
            Back
          </Button>
        </Row>
        {repos.length > 0 && renderTable()}
        {error && getError()}
      </Row>
    </Container>
  );
}
