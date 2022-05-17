import { v4 as idGenerator } from "uuid";
import { useState, useEffect } from "react";
import Country from "../Country";
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
        setCountries(data);
        setFilteredCountries(data);
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
    let tempCountries = [...countries];
    const region = e.target.textContent;
    const el = e.target.tagName;
    if (region === "All") {
      setFilteredCountries(tempCountries);
      return;
    }
    if (el === "BUTTON") {
      const regionCountries = [];
      tempCountries.forEach((country) => {
        if (country.region === region) {
          regionCountries.push(country);
        }
      });
      setFilteredCountries(regionCountries);
    }
  }

  return (
    <>
      <main>
        <Input
          value={value}
          handleChange={handleChange}
          handleClick={handleClick}
          handleDisplayRegion={handleDisplayRegion}
          clearSearchInput={clearSearchInput}
        />
        <div className="mx-auto mb-8 grid w-10/12 place-items-center gap-12 md:grid-cols-2 lg:w-full lg:grid-cols-4 lg:px-12">
          {filteredCountries.length > 0 && !isPending ? (
            filteredCountries.map((country) => (
              <Country key={idGenerator()} props={country} />
            ))
          ) : (
            <p className="text-center text-3xl font-bold">
              No such country found
            </p>
          )}
        </div>
      </main>
      {isPending && (
        <div className="text-center text-2xl font-bold dark:text-white">
          {error ? error : "Loading countries..."}
        </div>
      )}
    </>
  );
};

export default Home;
