import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import CountryContainer from "../src/components/CountryContainer";
import Details from "./components/Details";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

const App = () => {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  // const [regionCountries, setRegionCountries] = useState({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [id, setId] = useState("");
  // *** TEST COUNTRIES ***
  const [testCountries, setTestCountries] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) throw new Error("Could not fetch countries");
        const data = await response.json();
        const newData = data.map((country) => ({ ...country, id: v4() }));
        setCountries(newData);
        // **** TEST COUNTRIES ****
        setTestCountries(newData);
        // setRegionCountries({ text: "Filter by Region", country: newData });
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

  /*   function handleDisplayRegion(e) {
    const region = e.target.textContent;
    const regionText = document.getElementById("region-text");
    const el = e.target.tagName;
    if (region === "All") {
      setFilteredCountries(countries);
      setRegionCountries({ text: "Filter by Region", country: countries });
      regionText.textContent = regionCountries.text;
      hideRegion();
      setValue("");
      return;
    }
    if (el === "BUTTON") {
      const regionCountries = [];
      countries.forEach((country) => {
        if (country.region === region) regionCountries.push(country);
      });
      setFilteredCountries(regionCountries);
      setRegionCountries({ text: region, country: regionCountries });
      regionText.textContent = region;
      hideRegion();
      setValue("");
      return;
    }
  }

  function handleSearch(e) {
    let searchCountry = e.target.value;
    const regCountries = { ...regionCountries };
    if (searchCountry.length === 0) {
      setFilteredCountries(regCountries.country);
      document.getElementById("region-text").textContent = regCountries.text;
      return;
    }
    const tempCountries = regCountries.country.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
    setFilteredCountries(tempCountries);
  }
*/
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("");
  // ********** DETAILS
  const [optionsOpen, setOptionsOpen] = useState(false);
  const clearSearchInput = (e) => {
    if (input.length > 0) {
      setInput("");
      setRegion("");
      setTestCountries(countries);
    }
    e.preventDefault();
  };
  const userInput = useRef();
  const presentCountry = countries.find((country) => country.id === id);

  const inputHandler = (
    regionInput = region,
    textInput = userInput.current.value.toLowerCase()
  ) => {
    console.log(regionInput, textInput);
    const filterCountries = countries.filter((country) =>
      regionInput.length > 0
        ? country.name.toLowerCase().includes(textInput) &&
          country.region === regionInput
        : country.name.toLowerCase().includes(textInput)
    );
    setTestCountries(filterCountries);
    // ******* REGIONS ********
    // filterCountries = countries.filter(
    //   (country) =>
    //     country.name.toLowerCase().includes(input) && country.region === reg
    // );
    // setTestCountries(filterCountries);
  };
  const handleSearch = () => {
    // const te = e.target.value.toLowerCase();
    // setSearch(te);
    //  ********** FILTERING ******
    inputHandler();
    // let filterCountries = countries.filter((country) =>
    //   region
    //     ? country.name.toLowerCase().includes(input) &&
    //       country.region === region
    //     : country.name.toLowerCase().includes(input)
    // );
    // setTestCountries(filterCountries);
  };

  const handleDisplayRegion = (e) => {
    const reg = e.target.value;
    if (reg === "All") {
      // setTestCountries(countries);
      setRegion("");
      inputHandler("");
      hideRegion();
      setOptionsOpen(false);
    } else if (reg !== "All" && e.target.tagName === "BUTTON") {
      setRegion(reg);
      inputHandler(reg);
      hideRegion();
      setOptionsOpen(false);
      // filterCountries = countries.filter(
      //   (country) =>
      //     country.name.toLowerCase().includes(input) && country.region === reg
      // );
      // setTestCountries(filterCountries);
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
