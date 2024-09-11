"use client";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { Card, Input, Button, Upload } from "antd";
export default function PredictiveAnalytics() {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "xxx.png",
      status: "done",
      url: "http://www.baidu.com/xxx.png",
    },
  ]);
  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange: handleChange,
    multiple: true,
  };
  return (
    <>
      <div className="p-5 bg-white flex flex-col ">
        <h2 className="font-semibold text-lg mb-3">
          Upload files for analysis
        </h2>
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </div>
      <section className="my-5 px-5"></section>
    </>
  );
}
