"use client";
import { Card } from "antd";
import { Column, Line, Pie, WordCloud, Area } from "@ant-design/plots";
import Filters from "./filters";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import SearchFilters from "./searchFilters";
const { Title } = Typography;

export default function MarketResearch() {
  const [searchResults, setSearchResults] = useState(null); // Holds selected filters
  const [marketShareData, setMarketShareData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [segmentationData, setSegmentationData] = useState([]);
  const [commonThemesData, setCommonThemesData] = useState([]);
  const [insightsData, setInsightsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true); // Start loading spinner
    try {
      // Set search filters
      setSearchResults(filters);

      // Fetch Market Share Data
      const marketShareRes = await fetch(
        `/api/market-research/market-share-over-time?keywordId=${filters.keyword}&regionId=${filters.region}&dataSourceId=${filters.dataSource}&industryId=${filters.industry}`
      );
      const marketShare = await marketShareRes.json();
      setMarketShareData(marketShare);

      // Fetch Trends Over Time
      const trendRes = await fetch(
        `/api/market-research/industry-trend?keywordId=${filters.keyword}`
      );
      const trend = await trendRes.json();
      setTrendData(trend);

      // Fetch Segmentation Data
      const segmentationRes = await fetch(
        `/api/market-research/market-segmentation?keywordId=${filters.keyword}`
      );
      const segmentation = await segmentationRes.json();
      setSegmentationData(segmentation);

      // Fetch Common Themes (Word Cloud)
      const commonThemesRes = await fetch(
        `/api/market-research/common-themes?keywordId=${filters.keyword}`
      );
      const commonThemes = await commonThemesRes.json();
      setCommonThemesData(commonThemes);

      // Fetch Insights
      const insightsRes = await fetch(
        `/api/market-research/insights?keywordId=${filters.keyword}`
      );
      const insights = await insightsRes.json();
      setInsightsData(insights);
    } catch (error) {
      console.error("Error fetching data");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  const configColumn = {
    data: marketShareData ?? [],
    xField: "month",
    yField: "market_share_value",
    label: {
      text: (d) => `${d.market_share_value}%`,
      textBaseline: "bottom",
    },
    axis: {
      y: {
        labelFormatter: "",
      },
    },
  };
  const configArea = {
    data: trendData ?? [],
    xField: (d) => new Date(d.year),
    yField: "value",
  };
  const configPie = {
    data: segmentationData ?? [],
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
  const configWordCloud = {
    paddingTop: 20,
    data: commonThemesData ?? [],
    layout: { spiral: "rectangular" },
    colorField: "text",
  };
  return (
    <>
      <div className="p-5 bg-white flex flex-col">
        <Title level={1}>Market Research and Trend Analysis</Title>
        <SearchFilters onSearch={handleSearch} />
      </div>
      <section className="my-5 px-5">
        <Card title="Market Share Over Time">
          <Column {...configColumn} />
        </Card>
        <div className="flex items-center justify-between space-x-5 mt-5">
          <Card title="Trends over Time" style={{ width: "100%" }}>
            <Area {...configArea} />
          </Card>

          <Card title="Market Segmentation" style={{ width: "100%" }}>
            <Pie {...configPie} />
          </Card>
        </div>
        <div className="flex items-center justify-between space-x-5 mt-5">
          <Card title="Common Themes" style={{ width: "100%" }}>
            <WordCloud {...configWordCloud} />
          </Card>

          <Card title="AI Insights(Text Summary)" style={{ width: "100%" }}>
            {insightsData.map((item) => (
              <p key={item.id}>{item.insight}</p>
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
