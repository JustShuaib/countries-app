import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../Details";

function SingleCountry() {
  /*   const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);

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
  const param = useParams();
  const countryID = param.country;
  const presentCountry = countries.find(
    (country) => country.name === countryID
  ); */
  // return <Details country={presentCountry} countries={countries} />;
  return <div>Single Country</div>;
}

export default SingleCountry;
