import React from "react";
import { v4 as idGenerator } from "uuid";
import Country from "./Country";

function CountryContainer({ filteredCountries, isPending, error }) {
  if (filteredCountries.length === 0) {
    return (
      <p className="text-center text-2xl font-bold md:text-3xl">
        No such country exists
      </p>
    );
  }
  if (isPending) {
    return (
      <p className="text-center text-2xl font-bold md:text-3xl">
        Loading countries...
      </p>
    );
  } else if (error) {
    return (
      <p className="text-center text-2xl font-bold md:text-3xl">
        Failed to fetch countries
      </p>
    );
  }
  return (
    <div className="mx-auto mb-8 grid w-10/12 place-items-center gap-12 md:grid-cols-2 lg:w-full lg:grid-cols-4 lg:px-12">
      {filteredCountries.map((country) => (
        <Country key={idGenerator()} props={country} />
      ))}
    </div>
  );
}

export default CountryContainer;
