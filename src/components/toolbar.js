//Inspiration for this toolbar taken from ChatGPT exerpt, and modified for use here
import { Outlet, Link } from "react-router-dom";
import React from "react";
import "./toolbar.css";
import EndlessDishLogo from "../assets/logos";
import GitHubLogo from "../assets/github-mark.png";

function ToolbarItem(props) {
  return (
    <li id={props.id} className="button">
      <Link className="link" to={props.dest}>{props.text}</Link>
    </li>
  );
}

function Toolbar() {
  return (
    <nav className="toolbar">
      <Link to="/">
        <EndlessDishLogo width="75px" height="75px" />
      </Link>
      <ul className="tab">
        <ToolbarItem dest="/recipes" text="Browse Recipes" id="recipes" />
        <ToolbarItem dest="/submit" text="Submit" id="submit" />
        <ToolbarItem dest="/events" text="Events" id="events" />
        <ToolbarItem dest="/notices" text="Notices" id="notices" />
        <ToolbarItem dest="/about" text="About" id="about" />
        <Link to="https://github.com/IntrixTheName/EndlessDish">
          <img src={GitHubLogo} width="30px" height="30px" />
        </Link>
      </ul>
    </nav>
  );
}

export default Toolbar;