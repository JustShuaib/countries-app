import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import CountryContainer from "../src/components/CountryContainer";
import Details from "./components/Details";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

const App = () => {
  const [countries, setCountries] = useState([]),
    [filteredCountries, setFilteredCountries] = useState([]),
    [id, setId] = useState(""),
    [isPending, setIsPending] = useState(true),
    [error, setError] = useState(false),
    [detailOpen, setDetailOpen] = useState(false),
    [optionsOpen, setOptionsOpen] = useState(false),
    [region, setRegion] = useState(""),
    [input, setInput] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) throw new Error("Could not fetch countries");
        const data = await response.json();
        const countryList = data.map((country) => ({ ...country, id: v4() }));
        setCountries(countryList);
        setFilteredCountries(countryList);
        setIsPending(false);
      } catch {
        setIsPending(false);
        setError(true);
      }
    }
    getData();
  }, []);

  const userInput = useRef();
  /**
   * If there is a regionInput, filter the countries array by the textInput and regionInput, otherwise
   * filter the countries array by only the textInput.
   * @param [regionInput] - the region that the user has selected
   * @param [textInput] - userInput.current.value.toLowerCase()
   */
  const inputHandler = (
    regionInput = region,
    textInput = userInput.current.value.toLowerCase()
  ) => {
    const newCountries = countries.filter((country) =>
      regionInput
        ? country.name.toLowerCase().includes(textInput) &&
          country.region === regionInput
        : country.name.toLowerCase().includes(textInput)
    );
    setFilteredCountries(newCountries);
  };

  const regionHandler = (region, input, option = false) => {
    setRegion(region);
    inputHandler(input);
    setOptionsOpen(option);
  };

  const handleDisplayRegion = (e) => {
    const reg = e.target.value;
    if (reg === "All") regionHandler("", "");
    else if (e.target.tagName === "BUTTON") regionHandler(reg, reg);
  };

  const presentCountry = countries.find((country) => country.id === id);
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
            input={input}
            setInput={setInput}
            region={region}
            regions={uniqueRegions}
            onSearch={inputHandler}
            onDisplayRegion={handleDisplayRegion}
            optionsOpen={optionsOpen}
            setOptionsOpen={setOptionsOpen}
            text={userInput}
          />
          <CountryContainer
            countries={filteredCountries}
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
