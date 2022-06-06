import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import CountryContainer from "../src/components/CountryContainer";
import Details from "./components/Details";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [testCountries, setTestCountries] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) throw new Error("Could not fetch countries");
        const data = await response.json();
        const newData = data.map((country) => ({ ...country, id: v4() }));
        setCountries(newData);
        setTestCountries(newData);
        setIsPending(false);
      } catch {
        setIsPending(false);
        setError(true);
      }
    }
    getData();
  }, []);

  function hideRegion() {
    document.getElementById("regions").classList.add("invisible");
  }
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const inputHandler = (
    regionInput = region,
    textInput = userInput.current.value.toLowerCase()
  ) => {
    const filterCountries = countries.filter((country) =>
      regionInput.length > 0
        ? country.name.toLowerCase().includes(textInput) &&
          country.region === regionInput
        : country.name.toLowerCase().includes(textInput)
    );
    setTestCountries(filterCountries);
  };
  const clearSearchInput = (e) => {
    if (input.length > 0) {
      setInput("");
      inputHandler(region, "");
    }
    e.preventDefault();
  };
  const userInput = useRef();
  const presentCountry = countries.find((country) => country.id === id);

  const handleSearch = () => {
    inputHandler();
  };

  const handleDisplayRegion = (e) => {
    const reg = e.target.value;
    if (reg === "All") {
      setRegion("");
      inputHandler("");
      hideRegion();
      setOptionsOpen(false);
    } else if (reg !== "All" && e.target.tagName === "BUTTON") {
      setRegion(reg);
      inputHandler(reg);
      hideRegion();
      setOptionsOpen(false);
    }
  };

  const uniqueRegions = [
    "All",
    ...new Set(countries.map((country) => country.region)),
  ];
  return (
    <>
      <Navbar />
      {detailOpen ? (
        <Details
          country={presentCountry}
          countries={countries}
          setDetailOpen={setDetailOpen}
          setId={setId}
        />
      ) : (
        <main>
          <Input
            region={region}
            regions={uniqueRegions}
            onSearch={handleSearch}
            onDisplayRegion={handleDisplayRegion}
            input={input}
            setInput={setInput}
            clearInput={clearSearchInput}
            optionsOpen={optionsOpen}
            setOptionsOpen={setOptionsOpen}
            text={userInput}
          />
          <CountryContainer
            filteredCountries={testCountries}
            isPending={isPending}
            error={error}
            setDetailOpen={setDetailOpen}
            setId={setId}
          />
        </main>
      )}
    </>
  );
};

export default App;
