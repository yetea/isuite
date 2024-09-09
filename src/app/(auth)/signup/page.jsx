"use client";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import LogoBlack from "../../../../public/logo-black.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Image alt="logo" src={LogoBlack} className="mx-auto mb-5" />
        <p className="mb-10 text-center">
          Please enter your credentials to create an account!
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
          className="w-80"
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your First and Last name!",
            },
          ]}
          className="w-80"
        >
          <Input prefix={<UserOutlined />} placeholder="First and Last name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          className="w-80"
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button className="mb-3" block type="primary" htmlType="submit">
            Sign Up
          </Button>
          or <Link href="/login">Log in!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

