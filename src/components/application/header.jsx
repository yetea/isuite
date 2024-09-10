import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import Logo from "../../../public/logo-white.svg";

import { auth } from "@/auth";

export default async function AppHeader() {
  const session = await auth();
  const user = session?.user?.[0];

  return (
    <Header className="flex items-center justify-between !px-5 !text-white fixed w-full z-10">
      <Image src={Logo} alt="" />
      <div className="flex items-center space-x-3">
        <Avatar
          size={32}
          style={{
            backgroundColor: "#E6F7FF",
            color: "#1890FF",
          }}
          icon={<UserOutlined />}
        />
        <p>{user?.name}</p>
      </div>
    </Header>
  );
}
