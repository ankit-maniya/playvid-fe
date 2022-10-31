import { LinkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const SearchBar = ({ handleDownload }) => {
  const [search, setSearch] = useState("");

  return (
    <form>
      <div className="relative w-full lg:w-2/3 mx-auto">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <LinkIcon
            className="w-5 h-5 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          value={search || ""}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
          type="search"
          id="default-search"
          className="block text-white p-5 pl-10 pr-2 w-full bg-transparent border border-b-yellow-400  border-t-pink-400 border-l-indigo-400 border-r-orange-400 rounded-full focus:none focus:outline-none focus:border-b-yellow-700  focus:border-t-pink-700 focus:border-l-indigo-700 focus:border-r-orange-700"
          placeholder="Paste Link Hear!"
          required
        />
        {/* <div className="flex absolute inset-y-0 right-0 items-center pr-2">
                <button className="bg-gradient-to-r from-violet-500 via-pink-500 to-yellow-500 font-medium rounded-full  focus:none focus:outline-none text-white text-lg p-3 px-5">
                  Download
                </button>
              </div> */}
      </div>
      <div className="mt-1 sm:mt-2 relative w-full lg:w-2/3 mx-auto">
        <button
          type="button"
          onClick={() => {
            handleDownload(search);
          }}
          className=" bg-gradient-to-r hover:bg-gradient-to-l from-violet-500 via-pink-500 to-yellow-500 font-medium rounded-full  focus:none focus:outline-none text-white text-lg p-3 px-5 ml-0 m-2 drop-shadow-md "
        >
          Download
        </button>
        <button
          type="button"
          onClick={() => setSearch("")}
          className=" bg-gradient-to-r hover:bg-gradient-to-l from-violet-500 via-pink-500 to-yellow-500 font-medium rounded-full  focus:none focus:outline-none text-white text-lg p-3 px-5 sm:ml-0 lg:ml-2 drop-shadow-md "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
