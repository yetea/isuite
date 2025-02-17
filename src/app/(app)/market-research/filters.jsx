import React, { useState } from "react";
import { Input, Select, DatePicker, Button, InputNumber, Form } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Filters() {
  const handleSearch = async (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={handleSearch} layout="horizontal">
      <Form.Item name="q" label="Search Query">
        <Input placeholder="Enter keywords" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}
