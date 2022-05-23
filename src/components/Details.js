import { BsArrowLeft } from "react-icons/bs";
import Navbar from "./Navbar";
const Details = ({ country, countries, setDetailOpen, setId }) => {
  if (!country) return;
  const {
    name,
    topLevelDomain: tld,
    capital,
    region,
    subregion,
    population,
    nativeName,
    flags,
    languages: language,
    currencies: currency,
    borders,
  } = country;
  // Languages
  let languages = [];
  for (let lang of language) {
    languages.push(lang["name"]);
  }
  languages = languages.join(", ");
  // Currencies
  let currencies = [];
  for (let curr of currency) {
    currencies.push(curr["name"]);
  }
  currencies = currencies.join(", ");

  let countryBorders = [];
  if (borders) {
    countryBorders = borders.map((border) => (
      <li key={border}>
        <button
          className="rounded bg-light-mode-element py-1.5 px-3 text-center shadow-md dark:bg-dark-mode-element"
          onClick={() => setId(getBorder(border).id)}
        >
          {getBorder(border).name}
        </button>
      </li>
    ));
  }

  function getBorder(text) {
    return countries.find((border) => border.alpha3Code === text);
  }

  function formatPopulation(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <main>
      <Navbar />
      <button
        onClick={() => setDetailOpen(false)}
        className="my-10 ml-6 flex w-28 items-center rounded-md bg-white py-2 px-6 shadow-2xl dark:bg-dark-mode-element dark:text-white"
      >
        <BsArrowLeft className="mr-4" />
        Back
      </button>

      <div className="grid gap-10 px-6 dark:text-white lg:grid-cols-2 lg:gap-x-24 lg:px-20">
        <img src={flags.svg} alt="country flag" />
        <div className="grid items-start lg:grid-cols-2 lg:grid-rows-2">
          <section className="mb-10 space-y-3 px-8">
            <h1 className="mt-8 mb-6 text-xl font-bold lg:text-2xl">{name}</h1>
            <p>
              <b>Native Name:</b> <span>{nativeName}</span>
            </p>
            <p>
              <b>Population: </b> <span>{formatPopulation(population)}</span>
            </p>
            <p>
              <b>Region:</b> <span>{region}</span>
            </p>
            <p>
              <b>Sub Region:</b> <span>{subregion}</span>
            </p>
            <p>
              <b>Capital:</b> <span>{capital}</span>
            </p>
          </section>
          <div className="mb-10 space-y-3 px-8 lg:mt-24">
            <p>
              <b>Top Level Domain:</b> <span>{tld}</span>
            </p>
            <p>
              <b>Currencies:</b> <span>{currencies}</span>
            </p>
            <p>
              <b>Languages:</b> <span>{languages}</span>
            </p>
          </div>

          <section className="mb-10 flex flex-col pl-8 md:mb-0 lg:col-span-2  lg:flex-row ">
            <h2 className="mb-4 text-lg font-bold lg:mr-4 lg:mb-0">
              Border Countries:
            </h2>
            {borders ? (
              <ul className="flex flex-wrap gap-4 gap-y-6">{countryBorders}</ul>
            ) : (
              <p className="text-lg font-semibold">No border countries</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Details;
