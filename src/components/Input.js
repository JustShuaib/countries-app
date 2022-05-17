// import { useState } from "react";
// import { useEffect, useState } from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
// import UseFetch from "../useFetch";

const Input = ({ handleDisplayRegion, handleClick }) => {
  const [value, setValue] = useState("");
  function handleFilterToggle() {
    const regions = document.getElementById("regions");
    regions.classList.toggle("opacity-0");
  }
  // function handleDisplayRegion(e) {
  //   const region = e.target.textContent;
  //   return region;
  // }
  // const [continent, setContinent] = useState(handleDisplayRegion);
  // useEffect(() => {
  //   async function (continent){
  //     const
  //   }
  // })
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <div className="mx-auto my-6 w-11/12 lg:flex lg:items-center lg:justify-between">
      <form className=" mb-10 flex items-center rounded-md bg-white px-3 py-2 text-light-mode-input shadow dark:bg-dark-mode-element lg:mb-0 lg:w-5/12">
        <AiOutlineSearch className="mx-4 text-2xl dark:text-white" />
        <label htmlFor="search" className="w-full">
          <input
            onChange={handleChange}
            value={value}
            onKeyUp={handleClick}
            id="search"
            placeholder="Search for a country..."
            className="w-full px-3 py-2 outline-none  dark:bg-inherit dark:text-white dark:placeholder:text-white"
          />
        </label>
      </form>
      <div className="relative w-1/2 rounded-md bg-white p-4 shadow transition dark:bg-dark-mode-element dark:text-white lg:w-44">
        <button
          className="flex w-full items-center justify-between font-semibold"
          onClick={handleFilterToggle}
        >
          <span>Filter by Region</span>
          <MdKeyboardArrowDown className="text-xl" />
        </button>
        <div
          className="absolute -bottom-44 left-0 grid w-full justify-start gap-y-1 rounded-md bg-white p-4 text-left opacity-0 shadow transition dark:bg-dark-mode-element dark:text-white"
          id="regions"
          onClick={handleDisplayRegion}
        >
          <button className="text-left">Africa</button>
          <button className="text-left">America </button>
          <button className="text-left">Asia</button>
          <button className="text-left">Europe </button>
          <button className="text-left">Oceania</button>
        </div>
      </div>
    </div>
  );
};

export default Input;
