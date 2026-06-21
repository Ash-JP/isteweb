"use client";

import dynamic from "next/dynamic";

const KeystaticApp = dynamic(() => import("../keystatic"), { ssr: false });

export default function ClientApp(props: any) {
  console.log("ClientApp props:", props);
  return <KeystaticApp {...props} />;
}
