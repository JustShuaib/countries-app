import { useState, useEffect } from "react";
import { v4 } from "uuid";
import CountryContainer from "../src/components/CountryContainer";
import Details from "./components/Details";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [regionCountries, setRegionCountries] = useState({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) throw new Error("Could not fetch countries");
        const data = await response.json();
        const usefulData = data.map((country) => {
          const {
            name,
            population,
            region,
            subregion,
            topLevelDomain,
            nativeName,
            languages,
            currencies,
            borders,
            capital,
            flags,
            alpha3Code,
          } = country;
          const id = v4();
          const usefulData = {
            name,
            population,
            region,
            capital,
            topLevelDomain,
            subregion,
            nativeName,
            languages,
            currencies,
            borders,
            flags,
            id,
            alpha3Code,
          };
          return usefulData;
        });
        setCountries(usefulData);
        setFilteredCountries(usefulData);
        setRegionCountries({ text: "Filter by Region", country: usefulData });
        setIsPending(false);
      } catch {
        setIsPending(false);
        setError(true);
      }
    }
    getData();
  }, []);

  const hideRegion = () => {
    document.getElementById("regions").classList.add("opacity-0");
  };

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleDisplayRegion(e) {
    const region = e.target.textContent;
    const regionText = document.getElementById("region-text");
    const el = e.target.tagName;
    if (region === "All") {
      setFilteredCountries(countries);
      setRegionCountries({ text: "Filter by Region", country: countries });
      regionText.textContent = "Filter by Region";
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
  }

  const presentCountry = countries.find((country) => country.id === id);

  if (detailOpen)
    return (
      <Details
        country={presentCountry}
        countries={countries}
        setDetailOpen={setDetailOpen}
        setId={setId}
      />
    );
  return (
    <main>
      <Navbar />
      <Input
        value={value}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleDisplayRegion={handleDisplayRegion}
        clearSearchInput={clearSearchInput}
      />
      <CountryContainer
        filteredCountries={filteredCountries}
        isPending={isPending}
        error={error}
        setDetailOpen={setDetailOpen}
        setId={setId}
      />
    </main>
  );
};

export default Home;
