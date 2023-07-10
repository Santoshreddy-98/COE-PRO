import React from "react";
import { LandingPage } from "./LandingPage";
import { Sidebar } from "./Sidebar";
import '../AppDD.css'

export const SubHome = () => {
  return (
    <div className="app-container">
      <div className="content">
        <LandingPage />
      </div>
      <div className="sidebar">
            <Sidebar />
          </div>
    </div>
  );
};
