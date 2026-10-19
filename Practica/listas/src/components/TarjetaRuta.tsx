import type { Dificultad, Ruta } from "../datos/rutas";

interface TarjetaRutaProps {
  ruta: Ruta;
}

const textoDificultad: Record<Dificultad, string> = {
  baja: "Dificultad baja",
  media: "Dificultad media",
  alta: "Dificultad alta",
};

export function TarjetaRuta({ ruta }: TarjetaRutaProps) {
  const precio = ruta.precio.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  return (
    <article>
      <h3>{ruta.nombre}</h3>
      <p>{ruta.municipio} · {ruta.duracionHoras} horas · {precio}</p>
      <p>{textoDificultad[ruta.dificultad]}</p>

      {/* Paso 5: ternario (una cosa u otra) */}
      <p>{ruta.duracionHoras < 5 ? "Ruta corta" : "Jornada completa"}</p>

      {/* Paso 4: && (se muestra o no se muestra) */}
      {ruta.incluyeTransporte && <strong>Incluye transporte</strong>}

      {/* Paso 11: campo sin conectar, para probar el efecto de key */}
      <div>
        <input type="number" aria-label="Personas" />
      </div>
    </article>
  );
}