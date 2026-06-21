import type { Metadata } from "next";
import JoinClient from "./JoinClient";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Become an ISTE CEAL member and unlock exclusive networking, workshops, and technical events.",
};

export default function JoinPage() {
  return <JoinClient />;
}