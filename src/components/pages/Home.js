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
      } catch (error) {
        setIsPending(false);
        setError(true);
      }
    }
    getData();
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSearch(e) {
    let tempCountries = [];
    let searchCountry = e.target.value;
    if (searchCountry.length > 0) {
      tempCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
      setFilteredCountries(tempCountries);
    } else {
      setFilteredCountries(countries);
    }
  }

  function clearSearchInput(e) {
    if (value.length > 0) {
      setValue("");
      setFilteredCountries([...countries]);
    }
    e.preventDefault();
  }

  function handleDisplayRegion(e) {
    const region = e.target.textContent;
    const el = e.target.tagName;
    if (region === "All") {
      setFilteredCountries(countries);
      return;
    }
    if (el === "BUTTON") {
      const regionCountries = [];
      countries.forEach((country) => {
        if (country.region === region) {
          regionCountries.push(country);
        }
      });
      setFilteredCountries(regionCountries);
    }
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
