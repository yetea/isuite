"use client";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Card,
  Timeline,
  Typography,
  Spin,
  Button,
  Upload,
  message,
} from "antd";
import { Line } from "@ant-design/charts";

const { Text } = Typography;

export default function PredictiveAnalytics() {
  const [fileList, setFileList] = useState([]);
  const [latestUpload, setLatestUpload] = useState(null);
  const [data, setData] = useState({
    demandPattern: null,
    behaviorInsight: null,
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch both latest upload and forecast data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch the latest upload
      const resLatestUpload = await fetch("/api/predictive-analysis/upload");
      const latestUploadResult = await resLatestUpload.json();
      setLatestUpload(latestUploadResult);
      // If an analysis ID exists, fetch the forecast data
      if (latestUploadResult && latestUploadResult.latestUpload.id) {
        const resForecast = await fetch(
          `/api/predictive-analysis/forecast?analysisId=${latestUploadResult.latestUpload.id}`
        );
        const forecastResult = await resForecast.json();
        setData(forecastResult);
      } else {
        // Reset data if no analysis ID is available
        setData({
          demandPattern: null,
          behaviorInsight: null,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Handle file upload
  const handleUpload = async () => {
    if (!fileList.length) {
      message.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0]);
    setUploading(true);
    try {
      const res = await fetch("/api/predictive-analysis/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        message.success("File uploaded successfully!");
        // Refresh data after successful upload
        await fetchAllData();
        // Clear the file list
        setFileList([]);
      } else {
        message.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  // Upload component properties
  const uploadProps = {
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    onRemove: () => setFileList([]),
  };

  console.log(data, "hello");

  const salesConfig = {
    data: data.salesForecasts,
    xField: (d) => new Date(d.year),
    yField: "value",
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
  };

  return (
    <>
      <div className="p-5 bg-white flex flex-col ">
        <h2 className="font-semibold text-lg mb-3">
          Upload files for analysis
        </h2>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={!fileList.length || uploading}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
      <section className="my-5 px-5">
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin />
          </div>
        ) : !data ? (
          <Text>Please upload a file to view the forecast overview.</Text>
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            <Card title="Demand Pattern Predictions" style={{ flex: 1 }}>
              {data.demandPattern ? (
                data.demandPattern.map((data) => (
                  // eslint-disable-next-line react/jsx-key
                  <Timeline>
                    <Timeline.Item
                      color={data.status === "Solved" ? "green" : "red"}
                    >
                      {data.taskName} - {data.date}
                    </Timeline.Item>
                  </Timeline>
                ))
              ) : (
                <Text>No data available</Text>
              )}
            </Card>

            <Card title="Consumer Behavior Insights" style={{ flex: 1 }}>
              {data.behaviorInsight ? (
                data.behaviorInsight.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <Text>{item.insightText}</Text>
                ))
              ) : (
                <Text>No data available</Text>
              )}
            </Card>
          </div>
        )}
      </section>
      <section className="my-5 px-5">
        <Card title="Sales Forecast">
          <Line {...salesConfig} />
        </Card>
      </section>
    </>
  );
}
