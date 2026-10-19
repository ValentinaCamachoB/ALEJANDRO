import { rutas } from "./datos/rutas";
import type { Dificultad, Ruta } from "./datos/rutas";
import { ListaRutas } from "./components/ListaRutas";
import { RutasPorMunicipio } from "./components/RutasPorMunicipio";
// Reto: descomenta al terminar el paso 11
// import { RutasPorMunicipio } from "./components/RutasPorMunicipio";

// Paso 7: ninguna función modifica el arreglo original
function filtrarPorDificultad(lista: Ruta[], dificultad: Dificultad): Ruta[] {
  return lista.filter((ruta) => ruta.dificultad === dificultad);
}

type Criterio = "precio" | "duracion";

function ordenarRutas(lista: Ruta[], criterio: Criterio): Ruta[] {
  const copia = [...lista]; // sort modifica, por eso copiamos
  if (criterio === "precio") {
    return copia.sort((a, b) => a.precio - b.precio);
  }
  return copia.sort((a, b) => a.duracionHoras - b.duracionHoras);
}

function App() {
  const filtradas = filtrarPorDificultad(rutas, "baja");
  const resultado = ordenarRutas(filtradas, "precio");

  return (
    <main>
      <h1>Rutas turísticas del Quindío</h1>

      <p>Se encontraron {resultado.length} rutas</p>
      <ListaRutas rutas={resultado} />

      <h2>Rutas por municipio</h2>
      <RutasPorMunicipio rutas={rutas} />
    </main>
  );
}

export default App;