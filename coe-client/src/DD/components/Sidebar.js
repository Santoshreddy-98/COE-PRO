import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../AppDD.css";
  
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav-links">
        <li class="icon">
          <Link to="/" class="icon-link">
            <div class="icon-circle"><FaHome /></div>
          </Link>
        </li>
        <span class="horizontal-line"></span>
        <li class="icon">
          <Link to="/about" class="icon-link">
            <div class="icon-circle">DD</div>
          </Link>
        </li>
        <span class="horizontal-line"></span>
        <li class="icon">
          <Link to="/about" class="icon-link">
            <div class="icon-circle">DA</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
{/* <li class="icon">
          <Link to="/landingpage" class="icon-link">
            <div class="icon-circle">Run</div>
          </Link>
        </li>
        <span class="horizontal-line"></span>
        <li class="icon">
          <Link to="/flowmanager" class="icon-link">
            <div class="icon-circle">FM</div>
          </Link>
        </li> */}