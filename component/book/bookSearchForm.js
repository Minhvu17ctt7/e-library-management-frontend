import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import bookApi from 'api/bookApi';

const BookSearchForm = ({setSearchFilter}) => {
  const [filter, setFilter] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await bookApi.getCategories();
      setCategories(res);
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
      <Col sm={3}>
        <Form.Control
          type="text"
          placeholder="Author"
          value={filter ? filter['author.name_contains'] : ''}
          onChange={(e) => updateFilter('author.name_contains', e.target.value)}
          onKeyDown={onKeyDownHandler}
        />
      </Col>
      <Col sm={2}>
        <Form.Select
          value={filter ? filter['category.id'] : ''}
          onChange={(e) => updateFilter('category.id', e.target.value)}
        >
          <option value="" disabled>Category</option>
          {categories?.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Button variant="outline-success" className="mx-2" onClick={onClear}>Clear</Button>
        <Button variant="success" onClick={onSubmit}>Submit</Button>
      </Col>
    </Row>
  );
};

export default BookSearchForm;
