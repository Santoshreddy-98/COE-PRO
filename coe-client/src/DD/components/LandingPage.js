import React, { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../AppDD.css'

export const LandingPage = () => {
  return (  
    <div className="runDetailBox">
      <div className="runBox-1">Run</div>
      <div className="runBox-1">
        FM
        <div className="button-group">
          <button>Setup <FaAngleDoubleRight /></button>
          <button>View <FaAngleDoubleRight /></button>
        </div>
      </div>
      <div className="runBox-1">
        DD
        <div className="button-group">
          <Link to="/about" class="icon-link">
            <button>
              Go <FaAngleDoubleRight />
            </button>
          </Link>
        </div>
      </div>
      <div className="runBox-1">
        DA
        <div className="button-group">
          <Link to="/about" class="icon-link">
            <button>
              Go <span><FaAngleDoubleRight /></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
