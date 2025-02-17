"use client";

import { MessageOutlined } from "@ant-design/icons";
import { Card, List, Typography } from "antd";
import { useEffect, useState } from "react";
const { Text } = Typography;

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      const response = await fetch("/api/customer-feedback/recent-feedback");
      const data = await response.json();
      setFeedback(data);
      setLoading(false);
    }

    fetchFeedback();
  }, []);

  return (
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
  );
}
