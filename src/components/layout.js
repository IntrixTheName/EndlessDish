import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Toolbar from "./toolbar";
import "./layout.css";

const Layout = () => {
  /*const [news, setNews] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/get-notices");
      if (!response.ok) {
        console.log("fetchData() fetch error occured");
        return;
      }
      const records = await response.json();
      const now = new Date();
      const one_week_ago = new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      ).getTime();
      if (!records || new Date(records[0].date).getTime() < one_week_ago) {
        setNews("Yay! No updates to show from the last week!");
        return;
      } else {
        setNews(
          `${records.length > 1 ? `${records.length} updates` : `1 update`
          } within the last week. Latest: ${records[0].date.split("T")[0]} | ${records[0].title
          }`
        );
      }
    }
    fetchData();
  });*/

  return (
    <>
      <Toolbar />

      <header className="header">
        <p>{"Sample text, no news to show"}</p>
      </header>

      <Outlet />
    </>
  );
};

export default Layout;