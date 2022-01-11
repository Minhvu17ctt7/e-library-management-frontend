import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const MemberSearchForm = ({ setSearchFilter }) => {
  const [filter, setFilter] = useState(null);
  const updateFilter = (key, value) => {
    setFilter({ ...filter, [key]: value });
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
    <div>
      <Row className="my-3">
        <Col sm={10}>
          <Row>
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
                placeholder="Email"
                value={filter ? filter['email_contains'] : ''}
                onChange={(e) => updateFilter('email_contains', e.target.value)}
                onKeyDown={onKeyDownHandler}
              />
            </Col>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Address"
                value={filter ? filter['address_contains'] : ''}
                onChange={(e) => updateFilter('address_contains', e.target.value)}
                onKeyDown={onKeyDownHandler}
              />
            </Col>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={filter ? filter['phone_contains'] : ''}
                onChange={(e) => updateFilter('phone_contains', e.target.value)}
                onKeyDown={onKeyDownHandler}
              />
            </Col>
          </Row>

        </Col>
        <Col>
          <Button variant="outline-success" className="mx-2" onClick={onClear}>Clear</Button>
          <Button variant="success" onClick={onSubmit}>Search</Button>
        </Col>
      </Row>
    </div>
  );
};

export default MemberSearchForm;
