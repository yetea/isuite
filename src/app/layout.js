import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F0F2F5]">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
