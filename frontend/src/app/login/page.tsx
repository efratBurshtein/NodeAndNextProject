"use client";
import ReduxProvider from "@/component/reduxProvider";
import Login from "@/component/login";
import React from "react";
export default function LoginPage() {
  return (
    <ReduxProvider>
      <Login />
    </ReduxProvider>
  );
}
