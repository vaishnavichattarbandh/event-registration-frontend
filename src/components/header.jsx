import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img
        src="https://media.licdn.com/dms/image/v2/C4D0BAQHkM4UY3U-lGw/company-logo_200_200/company-logo_200_200/0/1655211726407/aurora_degree_college_logo?e=2147483647&v=beta&t=grSfonSQolcF4h_4ML1iW3v7Z_Cj53hJk6iAbNsNYno" 
        className="college-logo" 
        />
          <div className="college-text">
          <h1 className="college-name">
            AURORA'S DEGREE & PG COLLEGE
          </h1>
          <p className="college-subtitle">
            Affiliated to Osmania University<br/>
            H.No. 1-8-168/2/, Street No: 12,Chickadpally, Hyderabad-20
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;


