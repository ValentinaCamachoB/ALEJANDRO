export async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,region,flag,languages");

  if (!response.ok) {
    throw new Error("Error al obtener los países");
  }

  const data = await response.json();

  const countries = [];

  for (let i = 0; i < 30; i++) {
    const country = data[i];

    const pais = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "No disponible",
      population: country.population.toLocaleString(),
      region: country.region,
      flag: country.flag,
      language: country.languages ? Object.values(country.languages)[0] : "No disponible",
    };

    countries.push(pais);
  }

  return countries;
}