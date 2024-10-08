import { auth } from "@/auth";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Feedback from "./home/feeback";
import TrendsOverTime from "./home/trends-over-time";

export default async function Home() {
  const session = await auth();
  const user = session?.user?.[0];

  return (
    <>
      <div className="p-5 bg-white flex items-center space-x-5 ">
        <Avatar
          size={64}
          style={{
            backgroundColor: "#E6F7FF",
            color: "#1890FF",
          }}
          icon={<UserOutlined />}
        />
        <h1 className="text-lg font-semibold">
          Good Morning, {user?.name}. Have a nice day!
        </h1>
      </div>
      <section className="my-5 px-5">
        <TrendsOverTime />
        <Feedback />
      </section>
    </>
  );
}
