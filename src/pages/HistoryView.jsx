import React, { useState } from 'react';
import './HistoryView.css';

const events = [
  {
    year: "1649",
    era: "Alquimia",
    icon: "🔥",
    title: "Descubrimiento del Fósforo",
    subtitle: "Hennig Brand",
    description: "El alquimista alemán Hennig Brand descubrió el fósforo mientras calentaba orina evaporada. Fue el primer elemento descubierto con un descubridor documentado, marcando el inicio de la química sistemática.",
    color: "#f59e0b",
    elements: ["P"]
  },
  {
    year: "1766",
    era: "Gases y Metales",
    icon: "💨",
    title: "Descubrimiento del Hidrógeno",
    subtitle: "Henry Cavendish",
    description: "Henry Cavendish aisló y describió el 'aire inflamable', a lo que más tarde Antoine Lavoisier llamaría hidrógeno. Esta investigación abrió el camino hacia la química de los gases.",
    color: "#3b82f6",
    elements: ["H"]
  },
  {
    year: "1772",
    era: "Gases y Metales",
    icon: "🌬️",
    title: "Descubrimiento del Nitrógeno",
    subtitle: "Daniel Rutherford",
    description: "Daniel Rutherford, mientras estudiaba el 'aire irrespirable' en el que los ratones no podían sobrevivir, aisló el nitrógeno por eliminación del dióxido de carbono.",
    color: "#3b82f6",
    elements: ["N"]
  },
  {
    year: "1789",
    era: "La revolución química",
    icon: "⚗️",
    title: "Traité Élémentaire de Chimie",
    subtitle: "Antoine Lavoisier",
    description: "Lavoisier publicó el primer tratado moderno de química, enumerando 33 'elementos simples'. Distinguió metales, no metales y sustancias simples, estableciendo el concepto moderno de elemento químico.",
    color: "#10b981",
    elements: ["O", "H", "N", "S", "P"]
  },
  {
    year: "1803",
    era: "Teoría Atómica",
    icon: "⚛️",
    title: "Teoría Atómica de Dalton",
    subtitle: "John Dalton",
    description: "John Dalton propuso que la materia estaba compuesta de átomos indivisibles, y que cada elemento tenía átomos con masas características. Esto dio el fundamento teórico para ordenar los elementos.",
    color: "#8b5cf6",
    elements: []
  },
  {
    year: "1817",
    era: "Primeros Patrones",
    icon: "🎵",
    title: "Triadas de Döbereiner",
    subtitle: "Johann Wolfgang Döbereiner",
    description: "Döbereiner agrupó elementos en triadas (grupos de tres) donde el elemento central tenía masa atómica y propiedades promedio de los otros dos. Por ejemplo: Li, Na, K. Fue el primer indicio de una periodicidad.",
    color: "#f43f5e",
    elements: ["Li", "Na", "K", "Ca", "Sr", "Ba"]
  },
  {
    year: "1860",
    era: "Carrera hacia la Tabla",
    icon: "🏛️",
    title: "Congreso de Karlsruhe",
    subtitle: "Stanislao Cannizzaro",
    description: "El primer congreso internacional de química en Karlsruhe. Cannizzaro estandarizó los pesos atómicos usando el trabajo de Avogadro, resolviendo la confusión que impedía identificar patrones claros entre los elementos.",
    color: "#06b6d4",
    elements: []
  },
  {
    year: "1863",
    era: "Carrera hacia la Tabla",
    icon: "🎹",
    title: "Ley de los Octavos",
    subtitle: "John Newlands",
    description: "John Newlands observó que si los elementos se ordenaban por masa atómica, cada octavo elemento tenía propiedades similares. Llamó a esto 'Ley de los Octavos'. Fue ridiculizado por su idea... hasta que resultó ser correcta.",
    color: "#06b6d4",
    elements: []
  },
  {
    year: "1869",
    era: "La Gran Tabla",
    icon: "📜",
    title: "Tabla Periódica de Mendeleev",
    subtitle: "Dmitri Mendeleev",
    description: "Mendeleev publicó su tabla periódica ordenando 63 elementos conocidos por masa atómica. Su genialidad fue dejar espacios para elementos aún no descubiertos y predecir sus propiedades con asombrosa precisión. Predijo el Galio, Germanio y Escandio.",
    color: "#10b981",
    elements: ["Ga", "Ge", "Sc"]
  },
  {
    year: "1869",
    era: "La Gran Tabla",
    icon: "🇩🇪",
    title: "Tabla de Lothar Meyer",
    subtitle: "Julius Lothar Meyer",
    description: "Independientemente de Mendeleev, Lothar Meyer también desarrolló una tabla periódica similar basada en volúmenes atómicos. Publicó su trabajo completo en 1870. La historia reconoció a ambos como co-descubridores.",
    color: "#10b981",
    elements: []
  },
  {
    year: "1894",
    era: "Gases Nobles",
    icon: "🛡️",
    title: "Descubrimiento del Argón",
    subtitle: "Lord Rayleigh y William Ramsay",
    description: "Al notar que el nitrógeno del aire era más denso que el nitrógeno puro, Lord Rayleigh y Ramsay descubrieron el Argón, el primer gas noble. Este hallazgo forzó a agregar una nueva columna completa a la tabla.",
    color: "#fbc2eb",
    elements: ["Ar"]
  },
  {
    year: "1895",
    era: "Gases Nobles",
    icon: "☀️",
    title: "Helio en la Tierra",
    subtitle: "William Ramsay",
    description: "El Helio fue detectado primero en el sol en 1868 (de ahí su nombre, Helios), pero Ramsay lo aisló en la Tierra en 1895 del mineral uraninita. Fue el primero en darse cuenta de que el helio solar y el terrestre eran el mismo elemento.",
    color: "#fbc2eb",
    elements: ["He"]
  },
  {
    year: "1897",
    era: "Estructura del Átomo",
    icon: "⚡",
    title: "Descubrimiento del Electrón",
    subtitle: "J.J. Thomson",
    description: "J.J. Thomson identificó el electrón mediante experimentos con tubos de rayos catódicos. Demostró que los átomos no eran indivisibles, sino que contenían partículas subatómicas con carga negativa, cambiando para siempre la concepción del átomo.",
    color: "#8b5cf6",
    elements: []
  },
  {
    year: "1913",
    era: "Estructura del Átomo",
    icon: "🔢",
    title: "Número Atómico como Base",
    subtitle: "Henry Moseley",
    description: "Moseley descubrió que la frecuencia de los rayos X emitidos por un elemento es función de su número atómico (número de protones). Reordenó la tabla por número atómico en lugar de masa, resolviendo varias inconsistencias de Mendeleev.",
    color: "#8b5cf6",
    elements: ["Co", "Ni", "Te", "I"]
  },
  {
    year: "1940",
    era: "Era Nuclear",
    icon: "☢️",
    title: "Neptunio y Plutonio",
    subtitle: "Glenn Seaborg & Edwin McMillan",
    description: "Los primeros elementos transuránicos (más allá del Uranio) fueron sintetizados artificialmente en el acelerador de partículas de Berkeley. Esto inauguró la era de los elementos artificiales y la reconfiguración de la tabla con la serie de los Actínidos.",
    color: "#ef4444",
    elements: ["Np", "Pu"]
  },
  {
    year: "1945",
    era: "Era Nuclear",
    icon: "🔬",
    title: "Actínidos y Nueva Disposición",
    subtitle: "Glenn Seaborg",
    description: "Seaborg propuso que los elementos del radio al lawrencio formaban una segunda serie de elementos 'f', los Actínidos, análoga a los Lantánidos. Esto llevó a la disposición moderna de la tabla con ambas filas separadas en la parte inferior.",
    color: "#ef4444",
    elements: ["Ac", "Th", "Pa", "U", "Am", "Cm"]
  },
  {
    year: "2003",
    era: "Tabla Completa",
    icon: "🌟",
    title: "Ununtrium (113) y más allá",
    subtitle: "RIKEN, JINR, y otros laboratorios",
    description: "En el siglo XXI, laboratorios en Japón (RIKEN), Rusia (JINR) y EE.UU. sintetizaron los últimos elementos del periodo 7: 113 (Nihonium), 115 (Moscovium), 117 (Tennessine) y 118 (Oganesson), completando así el séptimo período de la tabla periódica.",
    color: "#f43f5e",
    elements: ["Nh", "Mc", "Ts", "Og"]
  },
];

const HistoryView = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [filterEra, setFilterEra] = useState('Todos');

  const eras = ['Todos', ...new Set(events.map(e => e.era))];
  const filtered = filterEra === 'Todos' ? events : events.filter(e => e.era === filterEra);

  return (
    <div className="history-page">
      <div className="history-header glass-panel">
        <span className="history-icon">📖</span>
        <div>
          <h2>Historia de la Tabla Periódica</h2>
          <p>Recorre los hitos científicos que dieron forma al ordenamiento de los elementos</p>
        </div>
      </div>

      <div className="era-filter-bar glass-panel">
        {eras.map(era => (
          <button
            key={era}
            className={`era-btn ${filterEra === era ? 'active' : ''}`}
            onClick={() => setFilterEra(era)}
          >
            {era}
          </button>
        ))}
      </div>

      <div className="timeline-container">
        <div className="timeline-line" />
        {filtered.map((event, index) => (
          <div
            key={index}
            className={`timeline-event ${index % 2 === 0 ? 'left' : 'right'} ${activeEvent === index ? 'expanded' : ''}`}
            onClick={() => setActiveEvent(activeEvent === index ? null : index)}
          >
            <div className="timeline-dot" style={{ background: event.color }}>
              <span>{event.icon}</span>
            </div>
            <div className="event-card glass-panel" style={{ borderTop: `4px solid ${event.color}` }}>
              <div className="event-year" style={{ color: event.color }}>{event.year}</div>
              <div className="event-era-tag" style={{ background: `${event.color}22`, color: event.color }}>
                {event.era}
              </div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-subtitle">— {event.subtitle}</p>

              {activeEvent === index && (
                <div className="event-details">
                  <p className="event-description">{event.description}</p>
                  {event.elements.length > 0 && (
                    <div className="event-elements">
                      <span className="elements-label">Elementos relacionados:</span>
                      <div className="elements-chips">
                        {event.elements.map(el => (
                          <span key={el} className="element-chip" style={{ background: event.color }}>
                            {el}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="event-expand-hint">
                {activeEvent === index ? '▲ Cerrar' : '▼ Ver más'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="timeline-footer glass-panel">
        <p>⚛️ La construcción de la Tabla Periódica es uno de los mayores logros colectivos de la humanidad, fruto de siglos de curiosidad, experimentación y colaboración científica.</p>
      </div>
    </div>
  );
};

export default HistoryView;
