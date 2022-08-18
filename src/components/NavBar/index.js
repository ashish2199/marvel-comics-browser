import React from "react";
import SearchInput from "components/NavBar/SearchInput";
import "./styles.scss";

function Header() {
  return (
    <div className="header">
      <div className="logo">Marvel</div>
      <div className="search-box">
        <SearchInput />
      </div>
    </div>
  );
}

export default Header;
