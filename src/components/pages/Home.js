import { useState, useEffect } from "react";
import CountryContainer from "../CountryContainer";
import Input from "../Input";
const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState(null);
  let [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) {
          throw new Error("Error, Could not fetch the data at that resource");
        }
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
        setError(error.message);
      }
    }
    getData();
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClick(e) {
    let tempCountries = [...countries];
    let searchCountry = e.target.value;
    if (searchCountry.length > 0) {
      tempCountries = tempCountries.filter((country) =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
      if (tempCountries.length === 0) return;
      setFilteredCountries(tempCountries);
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
        handleClick={handleClick}
        handleDisplayRegion={handleDisplayRegion}
        clearSearchInput={clearSearchInput}
      />
      <CountryContainer filteredCountries={filteredCountries} />
      {isPending && (
        <div className="text-center text-2xl font-bold dark:text-white">
          {error ? error : "Loading countries..."}
        </div>
      )}
    </main>
  );
};

export default Home;
