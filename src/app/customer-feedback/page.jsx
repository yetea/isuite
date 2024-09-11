"use client";
import { List, Typography, Card } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { Gauge, Scatter, Line } from "@ant-design/plots";

const { Text, Title } = Typography;
import { useEffect, useState } from "react";

export default function CustomerFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [themes, setThemes] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      const response = await fetch("/api/customer-feedback/recent-feedback");
      const data = await response.json();
      setFeedback(data);
      setLoading(false);
    }
    async function fetchThemes() {
      const response = await fetch("/api/customer-feedback/key-themes");
      const data = await response.json();
      setThemes(data);
      setLoading(false);
    }

    async function fetchTrends() {
      const response = await fetch("/api/customer-feedback/sentiment-trends");
      const data = await response.json();
      setTrends(data);
      setLoading(false);
    }

    fetchThemes();
    fetchTrends();
    fetchFeedback();
  }, []);

  const sentimentScore =
    feedback.reduce((acc, item) => acc + Number(item.sentimentScore), 0) /
    feedback.length;

  const config = {
    width: 520,
    height: 520,
    autoFit: true,
    data: {
      target: sentimentScore.toFixed(0),
      total: 100,
      name: "score",
      thresholds: [20, 60, 100],
    },
    legend: false,
    scale: {
      color: {
        range: ["#F4664A", "#FAAD14", "green"],
      },
    },
    style: {
      textContent: (target, total) => `${(target / total) * 100}%`,
    },
  };
  const configScatter = {
    data: themes ?? [],
    xField: "frequency",
    yField: "importanceScore",
    colorField: "theme",
  };
  const configLine = {
    data: trends ?? [],
    xField: (d) => new Date(d.year),
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
  };

  return (
    <>
      <div className="p-5 bg-white flex flex-col">
        <Title level={1}>Customer Feedback Analysis</Title>
      </div>
      <section className="my-5 px-5">
        <Card title="Recent Customer Feedback">
          <List
            itemLayout="horizontal"
            dataSource={feedback}
            loading={loading}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<MessageOutlined style={{ fontSize: "20px" }} />}
                  title={<Text strong>{item.keyword}</Text>}
                  description={<Text>{item.feedbackText}</Text>}
                />
                <Text type="secondary">
                  {new Date(item.submittedAt).toLocaleDateString()}
                </Text>
              </List.Item>
            )}
          />
        </Card>
        <div className="mt-5">
          <Card
            title="Overal Sentiment Score"
            style={{ width: "100%", margin: "auto" }}
          >
            <Gauge {...config} />
          </Card>
          <div className="flex items-center justify-between space-x-5 mt-5">
            <Card title="Common Themes" style={{ width: "100%" }}>
              <Scatter {...configScatter} />
            </Card>

            <Card title="Sentiment Trends" style={{ width: "100%" }}>
              <Line {...configLine} />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
