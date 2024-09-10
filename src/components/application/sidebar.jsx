import Sider from "antd/es/layout/Sider";

import { Layout, Menu } from "antd";
import Link from "next/link";
export default function AppSidebar() {
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
          mode="inline"
          items={[
            {
              key: "sub1",
              label: <Link href="/">Home</Link>,
            },
            {
              key: "sub2",
              label: <Link href="/market-research">Market Research</Link>,
            },
            {
              key: "sub3",
              label: (
                <Link href="/predictive-analytics">Predictive Analytics</Link>
              ),
            },
            {
              key: "sub4",
              label: <Link href="/risk-assessment">Risk Assessment</Link>,
            },
            {
              key: "sub5",
              label: <Link href="/customer-feedback">Customer Feedback</Link>,
            },
          ]}
        />
      </Sider>
    </Layout>
  );
}
