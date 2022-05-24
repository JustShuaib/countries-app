import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
const Navbar = () => {
  const [darkModeEnabled, setdarkModeEnabled] = useState(false);

  function handleModeToggle() {
    document.documentElement.classList.toggle("dark");
    setdarkModeEnabled(!darkModeEnabled);
  }

  return (
    <nav className="sticky left-0 top-0 z-20 flex items-center justify-between bg-white p-6 px-10 font-bold shadow dark:bg-dark-mode-element dark:text-white lg:px-16">
      <h1 className="md:text-lg">Where in the world?</h1>
      <button
        type="button"
        className="flex items-center gap-x-2 font-semibold"
        onClick={handleModeToggle}
      >
        {darkModeEnabled ? <FiSun /> : <FiMoon />}
        <span> {darkModeEnabled ? "Light" : "Dark"} Mode</span>
      </button>
    </nav>
  );
};

export default Navbar;
