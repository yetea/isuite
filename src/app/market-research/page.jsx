"use client";
import { Card, Input, Select } from "antd";
import { Column, Line, Pie, WordCloud } from "@ant-design/plots";
export default function MarketResearch() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const configColumn = {
    data: {
      type: "fetch",
      value:
        "https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json",
    },
    xField: "letter",
    yField: "frequency",
    label: {
      text: (d) => `${(d.frequency * 100).toFixed(1)}%`,
      textBaseline: "bottom",
    },
    axis: {
      y: {
        labelFormatter: ".0%",
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 0,
      radiusTopRight: 0,
    },
  };
  const configLine = {
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
    },
    xField: (d) => new Date(d.year),
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
  };
  const configPie = {
    data: [
      { type: "Category 1", value: 27 },
      { type: "Category 2", value: 25 },
      { type: "Category 3", value: 18 },
      { type: "Category 4", value: 15 },
      { type: "Category 5", value: 10 },
      { type: "Category 6", value: 5 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  const config = {
    paddingTop: 40,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/philosophy-word.json",
    },
    layout: { spiral: "rectangular" },
    colorField: "text",
  };
  return (
    <>
      <div className="p-5 bg-white flex flex-col ">
        <h2 className="font-semibold text-lg">Filters</h2>
        <div className="flex items-center justify-around space-x-5">
          <div className="flex items-center space-x-3 w-1/3">
            <p>Keyword:</p>
            <Input placeholder="keyword" />
          </div>
          <div className="flex items-center space-x-3 w-1/4">
            <p>Region:</p>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </div>
          <div className="flex items-center space-x-3 w-2/3">
            <p>Search Type:</p>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
              ]}
            />
          </div>
        </div>
      </div>
      <section className="my-5 px-5">
        <Card title="Interest over Time">
          <Column {...configColumn} />
        </Card>
        <div className="flex items-center justify-between space-x-5 mt-5">
          <Card title="Trends over Time" style={{ width: "100%" }}>
            <Line {...configLine} />
          </Card>

          <Card title="Regional Interest" style={{ width: "100%" }}>
            <Pie {...configPie} />
          </Card>
        </div>
        <div className="flex items-center justify-between space-x-5 mt-5">
          <Card title="Top Related Search" style={{ width: "100%" }}>
            <WordCloud {...config} />
          </Card>

          <Card title="AI Insights(Text Summary)" style={{ width: "100%" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            facere corrupti dolorum, temporibus voluptatum quidem quaerat animi
            sequi! Incidunt reprehenderit a itaque, voluptate voluptatem libero
            quos? Ab ullam officia molestiae!
          </Card>
        </div>
      </section>
    </>
  );
}
