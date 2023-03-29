import Searchbar from "./SearchBar";

import Logo from "../img/logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-between h-[80px] bg-gradient-to-r from-gradient-1 to-gradient-2 py-4  px-8 shadow-xl shadow-black/25">
      <Link to="/">
        <img className="w-[40px] h-[40px]" src={Logo} alt="logo" />
      </Link>

      <Searchbar />
    </div>
  );
}

export default Navbar;
