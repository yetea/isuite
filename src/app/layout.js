import AppHeader from "@/components/application/header";
import AppSidebar from "@/components/application/sidebar";
import "@/styles/globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-[#d6d6d6] h-full">
        <AntdRegistry>
          <Layout>
            <AppHeader />
            <AppSidebar />
            <Layout style={{ marginLeft: "200px", marginTop: "64px" }}>
              <Content style={{ minHeight: "calc(100vh - 64px)" }}>
                {children}
              </Content>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
