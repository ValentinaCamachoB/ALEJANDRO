import type { Ruta } from "../datos/rutas";
import { TarjetaRuta } from "./TarjetaRuta";

interface ListaRutasProps {
  rutas: Ruta[];
}

export function ListaRutas({ rutas }: ListaRutasProps) {
  if (rutas.length === 0) {
    return <p>No hay rutas que coincidan con los criterios elegidos.</p>;
  }

  return (
    <section>
      {rutas.map((ruta) => (
  <TarjetaRuta key={ruta.id} ruta={ruta} />
))}
    </section>
  );
}