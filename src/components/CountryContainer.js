import React from "react";
import Country from "./Country";

function CountryContainer({
  filteredCountries,
  isPending,
  error,
  setDetailOpen,
}) {
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
  } else if (filteredCountries.length === 0) {
    return (
      <p className="text-center text-2xl font-bold md:text-3xl">
        No such country exists
      </p>
    );
  }
  return (
    <div className="mx-auto grid max-h-fit-screen w-11/12 place-items-center gap-12 overflow-y-scroll px-6 pb-8 md:max-h-fit-screen-md md:grid-cols-2 lg:w-full lg:grid-cols-4 lg:px-12">
      {filteredCountries.map((country) => (
        <Country
          key={country.id}
          country={country}
          setDetailOpen={setDetailOpen}
        />
      ))}
    </div>
  );
}

export default CountryContainer;
