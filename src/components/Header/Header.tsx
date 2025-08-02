import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import logo from "../../images/logo.jpg";

function Header() {
  return (
    <header className={clsx()}>
      <div className="header-container">
        <Image src={logo} alt="nigger" width={200} height={200} />
      </div>
    </header>
  );
}

export default Header;
