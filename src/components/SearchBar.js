import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react";

function Searchbar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (query) {
      navigate(`/search/${query}`);

      setQuery("");
    }
  };

  return (
    <div className="w-[270px] sm:w-[350px] lg:w-[450px] ">
      <form className="w-full flex items-center" onSubmit={onSubmitForm}>
        <input
          value={query}
          className="w-[80%] py-2 px-4 rounded-l-md outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="w-[20%] py-2 flex justify-center bg-gray-light rounded-r-md items-center text-2xl  transition duration-150 hover:bg-custom-gray-dark">
          {<IoMdSearch />}
        </button>
      </form>
    </div>
  );
}

export default observer(Searchbar);
