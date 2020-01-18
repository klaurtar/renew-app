import React from "react";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import GroupHeader from "./GroupHeader";
import GroupList from "./GroupList";

export default function GroupIndex() {
  return (
    <PageContent>
      <Navbar />
      <GroupHeader />
      <GroupList />
    </PageContent>
  );
}
