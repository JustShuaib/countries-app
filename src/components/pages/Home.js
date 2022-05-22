import { useState, useEffect } from "react";
import CountryContainer from "../CountryContainer";
import Input from "../Input";
const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  let [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) throw "Could not fetch countries";
        const data = await response.json();
        const usefulData = data.map((country) => {
          const { name, population, region, capital, flags } = country;
          const usefulData = { name, population, region, capital, flags };
          return usefulData;
        });
        setCountries(usefulData);
        setFilteredCountries(usefulData);
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
      regionText.textContent = "Filter by Region";
      hideRegion();
      return;
    }
    if (el === "BUTTON") {
      const regionCountries = [];
      countries.forEach((country) => {
        if (country.region === region) regionCountries.push(country);
      });
      setFilteredCountries(regionCountries);
      regionText.textContent = region;
      hideRegion();
    }
  }

  function handleSearch(e) {
    let searchCountry = e.target.value;
    if (searchCountry.length === 0) {
      setFilteredCountries(countries);
      document.getElementById("region-text").textContent = "Filter by Region";
      return;
    }
    const tempCountries = filteredCountries.filter((country) =>
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
      />
    </main>
  );
};

export default Home;
