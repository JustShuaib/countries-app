import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowDown, MdClear } from "react-icons/md";

const Input = (props) => {
  const {
    handleDisplayRegion,
    handleSearch,
    clearSearchInput,
    value,
    handleChange,
    region,
  } = props;

  function handleFilterToggle() {
    const regions = document.getElementById("regions");
    regions.classList.toggle("invisible");
  }

  return (
    <div className="mx-auto my-6 px-10 lg:flex lg:items-center lg:justify-between lg:px-16">
      <form className="mb-10 flex items-center rounded-md bg-white px-3 py-2 text-light-mode-input shadow dark:bg-dark-mode-element lg:mb-0 lg:w-5/12">
        <AiOutlineSearch className="mx-4 text-2xl dark:text-white" />
        <label htmlFor="search" className="w-full dark:bg-dark-mode-element">
          <input
            onChange={handleChange}
            value={value}
            onKeyUp={handleSearch}
            id="search"
            placeholder="Search for a country..."
            className="w-full px-3 py-2 outline-none dark:bg-inherit dark:text-white dark:placeholder:text-white"
          />
        </label>
        <button aria-label="clear search" onClick={clearSearchInput}>
          <MdClear className="text-2xl dark:text-light-mode-element" />
        </button>
      </form>
      <div className="relative w-7/12 rounded bg-light-mode-element shadow dark:bg-dark-mode-element dark:text-white lg:w-44">
        <button
          className="flex w-full items-center justify-between rounded p-2 px-4 font-semibold md:p-4"
          onClick={handleFilterToggle}
        >
          <span id="region-text">{region}</span>
          <MdKeyboardArrowDown className="text-xl" />
        </button>
        <ul
          className="invisible absolute -bottom-52 left-0 z-10 grid w-full justify-start gap-y-1 rounded-md bg-white p-4 text-left shadow dark:bg-dark-mode-element dark:text-white"
          id="regions"
          onClick={handleDisplayRegion}
        >
          <li>
            <button className="text-left">All</button>
          </li>
          <li>
            <button className="text-left">Africa</button>
          </li>
          <li>
            <button className="text-left">Americas</button>
          </li>
          <li>
            <button className="text-left">Asia</button>
          </li>
          <li>
            <button className="text-left">Europe</button>
          </li>
          <li>
            <button className="text-left">Oceania</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Input;
