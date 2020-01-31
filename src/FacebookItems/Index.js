import React from "react";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import FacebookItemHeader from "./FacebookItemHeader";
import FacebookItemList from "./FacebookItemList";

export default function GroupIndex() {
  return (
    <PageContent>
      <Navbar />
      <FacebookItemHeader />
      <FacebookItemList />
    </PageContent>
  );
}
