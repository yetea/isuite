"use client";
import { Alert, Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import LogoBlack from "../../../../public/logo-black.svg";
import doLogin from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    try {
      const response = await doLogin(values);
      if (response.error) {
        response.error === "CredentialsSignin"
          ? setError("Invalid credentials")
          : setError("Something went wrong");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Invalid credentials");
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

        {error ? (
          <Alert className="!mb-5" message={error} type="error" />
        ) : (
          <p className="mb-10 text-center">
            Please enter you credentials to login!
          </p>
        )}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          className="w-80"
        >
          <Input prefix={<MailOutlined />} placeholder="email" />
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
            Log in
          </Button>
          or <Link href="/signup">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
