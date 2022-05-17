import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
const Navbar = () => {
  const [darkModeEnabled, setdarkModeEnabled] = useState(false);

  function handleModeToggle() {
    const page = document.documentElement;
    page.classList.toggle("dark");
    setdarkModeEnabled(!darkModeEnabled);
  }

  return (
    <nav className="sticky left-0 top-0 z-10 flex items-center justify-between bg-white p-6 font-bold shadow dark:bg-dark-mode-element dark:text-white lg:px-10">
      <p className="md:text-lg">Where in the world?</p>
      <button
        type="button"
        className="flex items-center font-semibold md:gap-x-2"
        onClick={handleModeToggle}
      >
        <MdOutlineDarkMode />
        <span> {darkModeEnabled ? "Light" : "Dark"} Mode</span>
      </button>
    </nav>
  );
};

export default Navbar;
