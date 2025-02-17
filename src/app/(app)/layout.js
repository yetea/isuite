import AppHeader from "@/components/application/header";
import AppSidebar from "@/components/application/sidebar";
import "@/styles/globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function AppLayout({ children }) {
  return (
    <>

      <AppHeader />
      <AppSidebar />
      <Layout style={{ marginLeft: "200px", marginTop: "64px" }}>
        <Content style={{ minHeight: "calc(100vh - 64px)" }}>
          {children}
        </Content>
      </Layout>

    </>
  );
}
