import { v4 as idGenerator } from "uuid";
import { useState, useEffect } from "react";
import Country from "../Country";
import Input from "../Input";
// import useFetch from "./useFetch";
const Home = () => {
  const [isPending, setIsPending] = useState(true);
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) {
          throw new Error("Error, Could not fetch the data at that resource");
        }
        const data = await response.json();
        setCountries(data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
      }
    }
    getData();
  }, []);
  function handleDisplayRegion(e) {
    setCountries(countries);
    const region = e.target.textContent;
    console.log(`You clicked ${region}`);
    const regionCountries = [];
    countries.forEach((country) => {
      if (country.region === region) {
        regionCountries.push(country);
      }
      setCountries(regionCountries);
    });
  }
  function handleClick(e) {
    console.log(e.key);
    const tempCountries = [...countries];
    console.log(e.target.value);
    let searchCountry = e.target.value;
    let filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
    console.log(filteredCountries);
    // setCountries(filteredCountries);
    // return (
    /* countries.filter(
      (country) => {
        country.name.common.includes(e.target.value);
      } */
    // countries.map((country) => (
    // <Country key={idGenerator()} props={country} />
    // )
    // );
  }
  return (
    <>
      <main>
        <Input
          handleClick={handleClick}
          handleDisplayRegion={handleDisplayRegion}
        />
        <div className="mx-auto mb-8 grid w-10/12 place-items-center gap-12 md:grid-cols-2 lg:w-full lg:grid-cols-4 lg:px-12">
          {countries &&
            countries.map((country) => (
              <Country key={idGenerator()} props={country} />
            ))}
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
