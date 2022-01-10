import React, { useState, useEffect } from 'react';
import Layout from "component/Layout/Layout";
import { useRouter } from "next/router";

export default function Mange() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/manage/books")
  })
  return (
    <>
      <Layout></Layout>
    </>
  );
}

