const loadBtn = document.getElementById("loadBtn");
const container = document.getElementById("container");
const spinner = document.getElementById("spinner");
const errorMsg = document.getElementById("errorMsg");

export async function initApp(callback) {
    loadBtn.addEventListener("click", async () => {
        errorMsg.textContent = ""; 
        container.innerHTML = ""; 
        spinner.classList.remove("hide");
        spinner.classList.add("show");

        try {
            const countries = await callback();
            spinner.classList.remove("show");
            spinner.classList.add("hide");
            render(countries);
        } catch (error) {
            spinner.classList.remove("show");
            spinner.classList.add("hide");
            errorMsg.textContent = error.message;
        }
    });
}

function getCard(country) {
    return `
    <div class="country-card">
      <span class="card-flag">${country.flag}</span>
      <h3 class="card-name">${country.name}</h3>
      <div class="card-info">
        <p>Capital: <span>${country.capital}</span></p>
        <p>Población: <span>${country.population}</span></p>
        <p>Idioma: <span>${country.language}</span></p>
         <p>Region: <span>${country.region}</span></p>
      </div>     
    </div>
  `;
}

function render(countries) {
    countries.forEach((country) => {
        const card = getCard(country);
        container.innerHTML += card;
    });
}
