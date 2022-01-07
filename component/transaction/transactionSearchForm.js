import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import transactionApi from 'api/transactionApi';

const TransactionSearchForm = ({setSearchFilter}) => {
  const [filter, setFilter] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    (async () => {
      // const res = await transactionApi.getCategories();
      // setCategories(res);
    })();
  }, []);
  const updateFilter = (key, value) => {
    setFilter({...filter, [key]: value});
  };
  const onClear = () => {
    setFilter(null);
    setSearchFilter({});
  };
  const onSubmit = () => {
    setSearchFilter(filter);
  };
  const onKeyDownHandler = (e) => {
    if (e.code === 'Enter') {
      onSubmit();
    }
  };
  return (
    <Row className="my-3">
      <Col sm={3}>
        <Form.Control
          type="text"
          placeholder="Name"
          value={filter ? filter['name_contains'] : ''}
          onChange={(e) => updateFilter('name_contains', e.target.value)}
          onKeyDown={onKeyDownHandler}
        />
      </Col>
      <Col>
        <Button variant="outline-success" className="mx-2" onClick={onClear}>Clear</Button>
        <Button variant="success" onClick={onSubmit}>Submit</Button>
      </Col>
    </Row>
  );
};

export default TransactionSearchForm;
