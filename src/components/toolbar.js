//Inspiration for this toolbar taken from ChatGPT exerpt, and modified for use here
import { Link } from "react-router-dom";
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
        <ToolbarItem dest="/submit" text="Submit Recipe" id="Submit" />
        <ToolbarItem dest="/notices" text="Notices" id="notices" />
        <ToolbarItem dest="/about" text="About" id="about" />
        <ToolbarItem dest="/admin" text="Admin" id="admin" />
        <Link to="https://github.com/IntrixTheName/EndlessDish">
          <img src={GitHubLogo} width="auto" height="60px" alt="See GitHub Source" title="See GitHub Source" />
        </Link>
      </ul>
    </nav>
  );
}

/*
        <ToolbarItem dest="/submit" text="Submit" id="submit" />
        <ToolbarItem dest="/events" text="Events" id="events" />
*/

export default Toolbar;