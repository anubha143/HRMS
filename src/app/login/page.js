"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { users } from "../../components/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";

const LoginUnfilled = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const user = users.find((user) => user.email === email);
      if (user && password === "password") {
        document.cookie = `user=${JSON.stringify(
          user
        )}; path=/; max-age=3600000;`;
        router.push("/");
      } else {
        alert("Invalid e-mail or password!");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div className="fixed top-0 left-0 flex items-center gap-3 pl-[1.125rem] pr-[1.125rem] p-5 max-w-sm">
        <Image src="/assets/logo-blue.jpg" alt="logo" width={32} height={32} />
        <div className="text-[#536dfe] text-center text-[2.125rem] leading-[123.5%]">
          Workforce
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-96 max-w-md">
        <div className="flex items-center self-stretch p-4">
          <div className="flex flex-col items-start">
            <div className="self-stretch text-black/[.87]  text-5xl leading-[116.7%]">
              Log In
            </div>
            <div className="self-stretch text-black/[.60] text-sm leading-[143%] mt-1">
              Please login to continue to your account.
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-4 self-stretch p-4"
        >
          <div className="flex flex-col items-start gap-4 self-stretch">
            <TextField
              name="email"
              id="outlined-email"
              type="email"
              label="E-Mail"
              variant="outlined"
              className="w-full"
              required
            />
            <TextField
              name="password"
              id="outlined-password"
              type="password"
              label="Password"
              variant="outlined"
              className="w-full"
              required
            />
          </div>
          <div className="flex justify-end  w-full">
            <div className="flex flex-col items-start">
              <div className="link text-[#2196f3] text-sm leading-[143%] underline">
                Forgot password?
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-start gap-2.5 pt-[0.5625rem] pr-[0.5625rem] pb-[0.5625rem] rounded-full">
                <Checkbox defaultChecked />
              </div>
            </div>
            <div className="flex flex-col items-start label-2 text-black/[.87]  leading-[150%]">
              Keep me logged In
            </div>
          </div>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            className="w-full"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginUnfilled;
