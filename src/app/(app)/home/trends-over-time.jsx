"use client";
import { Area } from "@ant-design/charts";
import { Card } from "antd";
import React, { useEffect, useState } from "react";

export default function TrendsOverTime() {
  const [trendData, setTrendData] = useState([]);
  useEffect(() => {
    async function fetchTrendsOverTime() {
      const response = await fetch(
        "/api/market-research/industry-trend?keywordId=1"
      );
      const data = await response.json();
      setTrendData(data);
    }

    fetchTrendsOverTime();
  }, []);

  const configArea = {
    data: trendData ?? [],
    xField: (d) => new Date(d.year),
    yField: "value",
  };

  return (
    <div className="flex items-center justify-between space-x-5 mt-5">
      <Card title="Trends over Time" style={{ width: "100%" }}>
        <Area {...configArea} />
      </Card>
    </div>
  );
}
