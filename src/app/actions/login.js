import { signIn } from "next-auth/react";

const doLogin = async (values) => {
  try {
    // Trigger NextAuth's signIn method
    const response = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect
      email: values.email,
      password: values.password,
    });
    return response;
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
};

export default doLogin;
