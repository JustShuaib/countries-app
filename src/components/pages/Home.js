import { useState, useEffect } from "react";
import { v4 as idGenerator } from "uuid";
import CountryContainer from "../CountryContainer";
import SingleCountry from "./SingleCountry";
import Input from "../Input";
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
          const { name, population, region, capital, flags } = country;
          const id = idGenerator();
          const usefulData = { name, population, region, capital, flags, id };
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
    const regions = document.getElementById("regions");
    regions.classList.add("opacity-0");
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
  function getId(id) {
    return;
  }
  const presentCountry = countries.find((country) => country.name);
  if (detailOpen) return <SingleCountry />;
  return (
    <main>
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
      />
    </main>
  );
};

export default Home;
