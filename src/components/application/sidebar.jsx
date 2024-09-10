"use client";
import Sider from "antd/es/layout/Sider";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function AppSidebar() {
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState([""]);
  useEffect(() => {
    if (pathname === "/") {
      setSelectedKey(["1"]);
    } else if (pathname.startsWith("/market-research")) {
      setSelectedKey(["2"]);
    } else if (pathname.startsWith("/predictive-analytics")) {
      setSelectedKey(["3"]);
    } else if (pathname.startsWith("/risk-assessment")) {
      setSelectedKey(["4"]);
    } else if (pathname.startsWith("/customer-feedback")) {
      setSelectedKey(["5"]);
    }
  }, [pathname]);
  return (
    <Layout hasSider>
      <Sider
        theme="light"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          height: "calc(100vh - 64px)",
        }}
      >
        <Menu
          selectedKeys={selectedKey}
          mode="inline"
          items={[
            {
              key: 1,
              label: <Link href="/">Home</Link>,
            },
            {
              key: 2,
              label: <Link href="/market-research">Market Research</Link>,
            },
            {
              key: 3,
              label: (
                <Link href="/predictive-analytics">Predictive Analytics</Link>
              ),
            },
            {
              key: 4,
              label: <Link href="/risk-assessment">Risk Assessment</Link>,
            },
            {
              key: 5,
              label: <Link href="/customer-feedback">Customer Feedback</Link>,
            },
          ]}
        />
      </Sider>
    </Layout>
  );
}
