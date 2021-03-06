const Country = ({ country, setDetailOpen, setId }) => {
  const { name, capital, region, population, flags } = country;

  return (
    <div
      className="min-h-full w-full cursor-pointer overflow-hidden rounded-lg bg-light-mode-element pb-2 shadow dark:bg-dark-mode-element dark:text-white lg:transition-transform lg:duration-500 lg:hover:-translate-y-2"
      onClick={() => {
        setDetailOpen(true);
        setId(country.id);
      }}
    >
      <img
        src={flags.svg}
        className="h-48 w-full object-cover"
        alt={`${name}'s flag`}
      />
      <section className="mt-4 mb-8 space-y-2 px-4">
        <h2 className="mb-3 text-lg font-bold">{name}</h2>
        <p>
          <strong>Population: </strong>
          <span>{population.toLocaleString()}</span>
        </p>
        <p>
          <strong>Region: </strong> <span>{region}</span>
        </p>
        <p>
          <strong>Capital: </strong>
          <span>{capital ? capital : "No capital"}</span>
        </p>
      </section>
    </div>
  );
};

export default Country;
