import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
const Details = ({ country, countries }) => {
  // const nativeName = country.name.nativeName.spa.common;
  if (!country) return;
  const nativeName = country.name.common;
  const region = country.region;
  const subregion = country.subregion;
  const capital = country.capital;
  const population = country.population;
  const flag = country.flags.svg;
  const tld = country.tld;
  const languagesObj = country.languages;
  let languages = [];
  for (let lang in languagesObj) {
    languages.push(languagesObj[lang]);
  }
  languages = languages.join(", ");

  const curr = country.currencies;
  let currArr = [];
  for (let c in curr) {
    currArr.push(curr[c]["name"]);
  }
  currArr = currArr.join(", ");

  let borders = country.borders;
  if (borders) {
    borders = borders.map((border, index) => (
      <li
        key={index}
        className="w-full rounded bg-light-mode-element py-1.5 px-3 text-center shadow-md dark:bg-dark-mode-element"
      >
        <a href="/">{getBorder(border)}</a>
      </li>
    ));
  }

  function formatPopulation(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getBorder(text) {
    const coun = countries.find((co) => co.cioc === text);
    return coun.name.common;
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
        <div className="grid lg:grid-cols-2 items-start lg:grid-flow-row">
          <section className="mb-10 space-y-3 px-8">
            <h2 className="mt-8 mb-6 text-xl font-bold lg:text-2xl">
              {nativeName}
            </h2>
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
              <b>Currencies:</b> <span>{currArr}</span>
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
              <ul className="flex justify-evenly space-x-3 ">{borders}</ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Details;
