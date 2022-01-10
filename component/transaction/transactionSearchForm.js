import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import transactionApi from 'api/transactionApi';
import moment from 'moment';

const convertTime = (time) => {
  return moment(time).format('YYYY-MM-DD');
};

const TransactionSearchForm = ({ setSearchFilter }) => {
  const [filter, setFilter] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    (async () => {
      // const res = await transactionApi.getCategories();
      // setCategories(res);
    })();
  }, []);
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
  const updateFilterSelect = (value) => {
    const date = convertTime(new Date())
    if (value === "2") {
      setFilter({ 'pay_date_gte': date, 'appointment_date_null': true });
    } else if (value === "3") {
      setFilter({ 'appointment_date_null': false });
    } else if (value === "4") {
      setFilter({ 'pay_date_lt': date, 'appointment_date_null': true });
    }
  }
  return (
    <Row className="my-3">
      <Col sm={3}>
        <Form.Control
          type="text"
          placeholder="transaction"
          value={filter ? filter['member.name_contains'] : ''}
          onChange={(e) => updateFilter('member.name_contains', e.target.value)}
          onKeyDown={onKeyDownHandler}
        />
      </Col>
      <Col sm={3}>
        <Form.Select
          value={filter ? filter['category.id'] : ''}
          onChange={(e) => updateFilterSelect(e.target.value)}
        >
          <option value="1">All</option>
          <option value="2">Borrowing</option>
          <option value="3">Paid</option>
          <option value="4">Expired</option>
        </Form.Select>
      </Col>
      <Col>
        <Button variant="outline-success" className="mx-2" onClick={onClear}>Clear</Button>
        <Button variant="success" onClick={onSubmit}>Submit</Button>
      </Col>
    </Row>
  );
};

export default TransactionSearchForm;
