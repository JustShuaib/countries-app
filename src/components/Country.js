import { Link } from "react-router-dom";

const Country = ({ props }) => {
  const name = props.name;
  const capital = props.capital;
  const region = props.region;
  const population = props.population;
  const flag = props.flags.svg;

  function formatPopulation(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="min-h-full w-full cursor-pointer overflow-hidden rounded-lg bg-light-mode-element pb-2 shadow-md hover:-translate-y-2 dark:bg-dark-mode-element dark:text-white">
      <Link to={`/${name}`}>
        <img
          src={flag}
          className="w-full object-cover lg:h-48"
          alt="country flag"
        />
        <section className="mt-4 mb-8 space-y-2 px-4">
          <h2 className="mb-3 text-lg font-bold">{name}</h2>
          <p>
            <strong>Population: </strong>
            <span>{formatPopulation(population)}</span>
          </p>
          <p>
            <strong>Region: </strong> <span>{region}</span>
          </p>
          <p>
            <strong>Capital: </strong> <span>{capital}</span>
          </p>
        </section>
      </Link>
    </div>
  );
};

export default Country;
