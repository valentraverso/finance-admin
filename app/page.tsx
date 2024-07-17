import HomeTemplate from "@/components/Dashboard/HomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headquarters - Finance Admin",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <HomeTemplate />
    </>
  );
}
