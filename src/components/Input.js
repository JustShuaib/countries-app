import { AiOutlineSearch } from "react-icons/ai";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClear,
} from "react-icons/md";

const Input = (props) => {
  const {
    onDisplayRegion,
    onSearch,
    region,
    regions,
    optionsOpen,
    setOptionsOpen,
    text,
    input,
    setInput,
  } = props;

  const clearInput = (e) => {
    if (input.length > 0) {
      setInput("");
      onSearch(region, "");
    }
    e.preventDefault();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    onSearch();
  };

  return (
    <div className="mx-auto my-6 px-10 lg:flex lg:items-center lg:justify-between lg:px-16">
      <form className="mb-10 flex items-center rounded-md bg-white px-3 py-2 text-light-mode-input shadow dark:bg-dark-mode-element lg:mb-0 lg:w-5/12">
        <AiOutlineSearch className="mx-4 text-2xl dark:text-white" />
        <label htmlFor="search" className="w-full dark:bg-dark-mode-element">
          <input
            onChange={handleChange}
            value={input}
            ref={text}
            id="search"
            placeholder="Search for a country..."
            className="w-full px-3 py-2 outline-none dark:bg-inherit dark:text-white dark:placeholder:text-white"
          />
        </label>
        <button aria-label="clear search" onClick={clearInput}>
          {input.length > 0 && (
            <MdClear className="text-2xl dark:text-light-mode-element" />
          )}
        </button>
      </form>
      <div className="relative w-8/12 rounded bg-light-mode-element shadow dark:bg-dark-mode-element dark:text-white lg:w-52">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded p-3 font-semibold md:p-4"
          onClick={() => setOptionsOpen((prev) => !prev)}
        >
          <span id="region-text">{region || "Filter by Region"}</span>{" "}
          {optionsOpen ? (
            <MdKeyboardArrowUp className="text-xl" />
          ) : (
            <MdKeyboardArrowDown className="text-xl" />
          )}
        </button>
        <ul
          className={`absolute -bottom-72 left-0 z-20 grid w-full justify-start gap-y-1 rounded-md bg-white p-4 text-left shadow dark:bg-dark-mode-element dark:text-white ${
            optionsOpen ? "visible" : "invisible"
          }`}
          id="regions"
          onClick={onDisplayRegion}
        >
          {regions.map((region) => (
            <li key={region}>
              <button type="button" className="text-left" value={region}>
                {region}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Input;
