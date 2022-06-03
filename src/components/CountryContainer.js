import React from "react";
import Country from "./Country";

function CountryContainer({
  filteredCountries,
  isPending,
  error,
  setDetailOpen,
  setId,
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
    <div
      className="mx-auto grid place-items-center gap-16 px-10 pb-8 md:grid-cols-2 lg:max-h-fit-screen-md lg:w-full lg:grid-cols-4 lg:overflow-y-scroll lg:px-16"
      tabIndex="0"
    >
      {filteredCountries.map((country) => (
        <Country
          key={country.id}
          setId={setId}
          country={country}
          setDetailOpen={setDetailOpen}
        />
      ))}
    </div>
  );
}

export default CountryContainer;
