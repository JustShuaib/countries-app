import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
const Details = ({ country, countries }) => {
  if (!country) return;
  const name = country.name;
  const tld = country.topLevelDomain;
  const capital = country.capital;
  const region = country.region;
  const subregion = country.subregion;
  const population = country.population;
  const nativeName = country.nativeName;
  const flag = country.flags.svg;
  const language = country.languages;
  let languages = [];
  for (let lang of language) {
    languages.push(lang["name"]);
  }
  languages = languages.join(", ");

  const curr = country.currencies;
  let currencies = [];
  for (let currency of curr) {
    currencies.push(currency["name"]);
  }
  currencies = currencies.join(", ");

  function getBorder(text) {
    const coun = countries.find((co) => co.alpha3Code === text);
    return coun && coun.name;
  }

  let borders = country.borders;
  if (borders) {
    borders = borders.map((border, index) => (
      <Link
        to={`/${getBorder(border)}`}
        key={index}
        className="rounded bg-light-mode-element py-1.5 px-3 text-center shadow-md dark:bg-dark-mode-element"
      >
        {getBorder(border)}
      </Link>
    ));
  }

  function formatPopulation(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <Link
        to="/"
        className="w-28 my-10 ml-6 flex items-center rounded-md bg-white py-2 px-6 shadow-2xl dark:bg-dark-mode-element dark:text-white"
      >
        <BsArrowLeft className="mr-4" />
        Back
      </Link>

      <main className="grid gap-10 lg:gap-x-24 px-6 dark:text-white lg:grid-cols-2 lg:px-20">
        <img src={flag} alt="country flag" />
        <div className="grid lg:grid-cols-2 items-start lg:grid-rows-2">
          <section className="mb-10 space-y-3 px-8">
            <h2 className="mt-8 mb-6 text-xl font-bold lg:text-2xl">{name}</h2>
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
          {borders && (
            <section className="mb-5 flex flex-col px-8 lg:col-span-2 lg:h-8 lg:flex-row ">
              <h4 className="mb-4 text-lg font-bold lg:mr-4 lg:mb-0">
                Border Countries:
              </h4>
              <ul className="flex justify-evenly lg:justify-start flex-wrap gap-3">
                {borders}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Details;
