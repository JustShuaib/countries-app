import { useState, useEffect } from "react";
import { v4 } from "uuid";
import CountryContainer from "../src/components/CountryContainer";
import Details from "./components/Details";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

const App = () => {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [regionCountries, setRegionCountries] = useState({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [id, setId] = useState("");
  // *********** FILTER COUNTRIES
  // const [filterCountries, setFilterCountries] = useState([])
  let filterCountries;

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) throw new Error("Could not fetch countries");
        const data = await response.json();
        // const id = v4();
        // const usefulData = data.map((country) => {
        //   const {
        //     name,
        //     population,
        //     region,
        //     subregion,
        //     topLevelDomain,
        //     nativeName,
        //     languages,
        //     currencies,
        //     borders,
        //     capital,
        //     flags,
        //     alpha3Code,
        //   } = country;
        // const usefulData = {
        //   name,
        //   population,
        //   region,
        //   capital,
        //   topLevelDomain,
        //   subregion,
        //   nativeName,
        //   languages,
        //   currencies,
        //   borders,
        //   flags,
        //   id,
        //   alpha3Code,
        // };
        // return usefulData;
        // });
        const newData = data.map((country) => ({ ...country, id: v4() }));
        console.log(newData);
        setCountries(newData);
        // setCountries({ data, id });
        setFilteredCountries(newData);
        setRegionCountries({ text: "Filter by Region", country: newData });
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

  // function handleChange(e) {
  //   setSearch(e.target.value);
  //   console.log("This is change", e.target.value);
  // }

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

  function clearSearchInput(e) {
    if (value.length > 0) {
      setValue("");
      document.getElementById("region-text").textContent = "Filter by Region";
      setFilteredCountries(countries);
    }
    e.preventDefault();
  } */

  const presentCountry = countries.find((country) => country.id === id);
  // /  function handleDisplayRegion(e) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [testCountries, setTestCountries] = useState(countries);
  filterCountries = countries;

  function handleSearch(e) {
    const te = e.target.value;
    setSearch(te.toLowerCase());

    let filterCountries = countries.filter((country) =>
      region
        ? country.name.toLowerCase().includes(te) && country.region === region
        : country.name.toLowerCase().includes(te)
    );
    console.log("text is " + te, "btn is " + region, filterCountries);
    setTestCountries(filterCountries);
  }
  function handleDisplayRegion(e) {
    const reg = e.target.value;
    setRegion(reg);
    let filterCountries;
    if (reg !== "All" && e.target.tagName === "BUTTON")
      filterCountries = countries.filter(
        (country) =>
          country.name.toLowerCase().includes(search) && country.region === reg
      );
    console.log("text is " + search, "btn is " + reg, filterCountries);
    setTestCountries(filterCountries);
  }

  const clearSearchInput = () => {};

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
            uniqueRegions={uniqueRegions}
            region={regionCountries.text}
            handleSearch={handleSearch}
            handleDisplayRegion={handleDisplayRegion}
            clearSearchInput={clearSearchInput}
          />
          <CountryContainer
            filteredCountries={search || region ? testCountries : countries}
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
