/* import { useEffect, useContext, createContext } from "react";


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
const countryContext = createContext(); */
