"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, Button, Row, Col, Form } from "antd";

const { Option } = Select;

const SearchFilters = ({ onSearch }) => {
  const [regions, setRegions] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const [form] = Form.useForm();

  // Fetch the filter options when the component mounts
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [regionsRes, industriesRes, dataSourcesRes, keywordsRes] =
          await Promise.all([
            fetch("/api/market-research/regions").then((res) => res.json()), // Fetch regions
            fetch("/api/market-research/industries").then((res) => res.json()), // Fetch industries
            fetch("/api/market-research/data-sources").then((res) =>
              res.json()
            ),
            fetch("/api/market-research/keywords").then((res) => res.json()), // Fetch data sources
          ]);

        setRegions(
          regionsRes.map((region) => ({
            value: region.id,
            label: region.regionName,
          }))
        );
        setIndustries(
          industriesRes.map((industry) => ({
            value: industry.id,
            label: industry.industryName,
          }))
        );
        setDataSources(
          dataSourcesRes.map((dataSource) => ({
            value: dataSource.id,
            label: dataSource.sourceName,
          }))
        );
        setKeywords(
          keywordsRes.map((keyword) => ({
            value: keyword.id,
            label: keyword.keyword,
          }))
        );
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchFilters();
  }, []);

  // Handle form submission
  const handleSearch = (values) => {
    onSearch(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSearch}>
      <Row gutter={16} align="middle">
        <Col span={8}>
          <Form.Item label="Keyword" name="keyword">
            <Select
              placeholder="Select a keyword"
              style={{ width: "100%" }}
              options={keywords} // Use options prop
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Region" name="region">
            <Select
              placeholder="Select a region"
              style={{ width: "100%" }}
              options={regions} // Use options prop
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Industry" name="industry">
            <Select
              placeholder="Select an industry"
              style={{ width: "100%" }}
              options={industries} // Use options prop
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Data Source" name="dataSource">
            <Select
              placeholder="Select a data source"
              style={{ width: "100%" }}
              options={dataSources} // Use options prop
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item className="!mb-0">
            <Button type="primary" htmlType="submit" className="w-full">
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFilters;
