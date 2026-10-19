import type { Ruta } from "../datos/rutas";
import { TarjetaRuta } from "./TarjetaRuta";

interface RutasPorMunicipioProps {
  rutas: Ruta[];
}

export function RutasPorMunicipio({ rutas }: RutasPorMunicipioProps) {
  // Set elimina repetidos; [...] lo vuelve arreglo
  const municipios = [...new Set(rutas.map((ruta) => ruta.municipio))];

  return (
    <>
      {municipios.map((municipio) => (
        <section key={municipio}>
          <h2>{municipio}</h2>
          {rutas
            .filter((ruta) => ruta.municipio === municipio)
            .map((ruta) => (
              <TarjetaRuta key={ruta.id} ruta={ruta} />
            ))}
        </section>
      ))}
    </>
  );
}