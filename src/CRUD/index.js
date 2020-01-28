import React from "react";
import PageContent from "../PageContent";
import Navbar from "../Navbar";
import IndexHeader from "./IndexHeader";
import ItemList from "./ItemList";


export default function Index() {
  return (
    <PageContent>
      <Navbar />
      <IndexHeader />
      <ItemList />
    </PageContent>
  );
}
