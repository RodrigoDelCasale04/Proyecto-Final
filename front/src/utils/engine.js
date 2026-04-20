import { paneles } from '../data/paneles';

export const procesarSimulacion = (data) => {
  const { prioridad, gasto, superficie, orientacion } = data;
  let db = [...paneles];

// 1. Selección por prioridad (Dentro de tu función de cálculo)
if (prioridad === "economico") {
    db.sort((a, b) => a.costo_watt_eur - b.costo_watt_eur);
} else if (prioridad === "potencia") {
    db.sort((a, b) => b.watts - a.watts);
} else if (prioridad === "garantia") {
    db.sort((a, b) => b.garantia - a.garantia);
} else {
    // Por defecto: Mayor eficiencia
    db.sort((a, b) => b.eficiencia - a.eficiencia);
}

  const panelIdeal = db[0];

  // 2. Factor orientación
  let factorOrientacion = 1.0;
  if (orientacion === "este" || orientacion === "oeste") factorOrientacion = 0.85;
  if (orientacion === "norte") factorOrientacion = 0.60;

  // 3. Cantidad necesaria para cubrir el gasto (Freno lógico)
  const ahorroEstimadoPorPanel = 16 * factorOrientacion; 
  const cantParaCubrirGasto = Math.ceil(gasto / ahorroEstimadoPorPanel);
  const cantMaximaPorTecho = Math.floor(superficie / panelIdeal.area_m2);
  
  // No instalamos más de lo que el cliente necesita ni más de lo que cabe
  const cantidadFinal = Math.min(cantParaCubrirGasto, cantMaximaPorTecho);

  return {
    panel: panelIdeal,
    cantidad: cantidadFinal,
    areaOcupada: (cantidadFinal * panelIdeal.area_m2).toFixed(2),
    gastoOriginal: gasto
  };
};