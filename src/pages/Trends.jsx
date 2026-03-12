import React, { useState, useMemo } from 'react';
import elementsData from '../data/PeriodicTableJSON.json';
import { translateElement } from '../data/translations';
import { Target, Zap, Activity, Shield } from 'lucide-react';
import './Trends.css';

const trendsMap = {
  electronegativity: {
    id: 'electronegativity',
    label: 'Electronegatividad',
    icon: <Zap size={18} />,
    getValue: (el) => el.electronegativity_pauling,
    desc: 'Escala de Pauling visualizada por intensidad de color.',
    analysis: 'La electronegatividad es una medida de la tendencia de un átomo a atraer un par de electrones compartidos. Generalmente aumenta a medida que te mueves de izquierda a derecha en un periodo debido a una mayor atracción del núcleo por los electrones, y disminuye al bajar por un grupo debido al aumento de la distancia entre el núcleo y los electrones de valencia.',
    concepts: [
      'Escala de Pauling: Flúor es el máximo (3.98), Francio el mínimo (0.7).',
      'Aumenta con el carácter no metálico y disminuye con el carácter metálico.',
      'Gases Nobles: He, Ne y Ar no forman enlaces habitualmente y carecen de valor asignado.'
    ],
    colorBase: [59, 130, 246] // Blue rgb
  },
  ionization: {
    id: 'ionization',
    label: 'Energía de Ionización',
    icon: <Activity size={18} />,
    getValue: (el) => el.ionization_energies && el.ionization_energies.length > 0 ? el.ionization_energies[0] : null,
    desc: 'Energía necesaria para remover un electrón (kJ/mol).',
    analysis: 'La energía de ionización es la energía mínima requerida para arrancar el electrón menos fuertemente unido de un átomo gaseoso aislado. Aumenta de izquierda a derecha en un mismo periodo y disminuye de arriba hacia abajo en un mismo grupo.',
    concepts: [
      'Los metales alcalinos tienen la energía más baja.',
      'Los gases nobles tienen la energía más alta para permanecer estables.',
      'Sirve como indicador de la reactividad de un elemento metálico.'
    ],
    colorBase: [239, 68, 68] // Red rgb
  },
  affinity: {
    id: 'affinity',
    label: 'Afinidad Electrónica',
    icon: <Target size={18} />,
    getValue: (el) => el.electron_affinity,
    desc: 'Cambio de energía al añadir un electrón (kJ/mol).',
    analysis: 'La afinidad electrónica es la energía liberada (o absorbida) cuando se añade un electrón a un átomo neutro en estado gaseoso. De manera general, aumenta de izquierda a derecha en la tabla.',
    concepts: [
      'Los halógenos tienen la mayor afinidad electrónica.',
      'Valores negativos en la convención indican liberación de energía.',
      'Mide la facilidad con la que un átomo acepta un electrón.'
    ],
    colorBase: [16, 185, 129] // Green rgb
  },
  density: {
    id: 'density',
    label: 'Densidad',
    icon: <Shield size={18} />,
    getValue: (el) => el.density,
    desc: 'Masa por unidad de volumen volumétrico (g/cm³).',
    analysis: 'La densidad de los elementos varía enormemente en la tabla periódica. Los elementos con mayor densidad se encuentran en el centro del bloque d (los metales de transición), como el Osmio e Iridio.',
    concepts: [
      'Osmio es el elemento más denso conocido.',
      'Los gases tienen densidades extremadamente bajas.',
      'La densidad depende del peso atómico y del volumen atómico.'
    ],
    colorBase: [245, 158, 11] // Amber rgb
  }
};

const Trends = () => {
  const rawElements = elementsData.elements || elementsData;
  const elements = useMemo(() => rawElements.map(translateElement), []);
  const [activeTrend, setActiveTrend] = useState('electronegativity');
  const trend = trendsMap[activeTrend];

  const { minVal, maxVal } = useMemo(() => {
    let min = Infinity, max = -Infinity;
    elements.forEach(el => {
      const val = trend.getValue(el);
      if (val !== null && typeof val === 'number') {
        if (val < min) min = val;
        if (val > max) max = val;
      }
    });
    return { minVal: min, maxVal: max };
  }, [elements, trend]);

  const getColorStyle = (element) => {
    const val = trend.getValue(element);
    if (val === null || val === undefined) return { 
      backgroundColor: '#f8fafc', 
      opacity: 0.8, 
      color: 'var(--color-text-muted)',
      border: '1px solid #cbd5e1'
    };
    
    const ratio = Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal + 0.0001)));
    const [r, g, b] = trend.colorBase;
    
    // Mix white/transparent to color base
    const bgAlpha = 0.15 + (ratio * 0.85);
    
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${bgAlpha})`,
      color: ratio > 0.4 ? 'white' : 'var(--color-text-main)',
      border: `1px solid rgba(${r}, ${g}, ${b}, 0.3)`
    };
  };

  return (
    <div className="trends-page">
      <div className="trends-sidebar">
        <div className="selector-panel glass-panel">
          <h3>Selector de Tendencia</h3>
          <div className="trend-options">
            {Object.values(trendsMap).map(t => (
              <button
                key={t.id}
                className={`trend-btn ${activeTrend === t.id ? 'active' : ''}`}
                onClick={() => setActiveTrend(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="legend-panel glass-panel">
          <h3>Leyenda de Escala</h3>
          <div className="scale-bar">
            <div className="scale-gradient" style={{
              background: `linear-gradient(to right, rgba(${trend.colorBase.join(',')}, 0.1), rgba(${trend.colorBase.join(',')}, 1))`
            }}></div>
            <div className="scale-labels">
              <span>Valor Bajo ({minVal === Infinity ? '0' : minVal.toFixed(1)})</span>
              <span>Valor Alto ({maxVal === -Infinity ? '0' : maxVal.toFixed(1)})</span>
            </div>
          </div>
          <p className="scale-desc">{trend.desc}</p>
        </div>
      </div>

      <div className="trends-main">
        <div className="trend-header">
          <h2>Tendencia: {trend.label}</h2>
          <p>{trend.desc}</p>
        </div>

        <div className="heatmap-container glass-panel">
          <div className="directions">
            <span className="dir-up">↑ AUMENTA HACIA ARRIBA</span>
            <span className="dir-right">→ AUMENTA HACIA LA DERECHA</span>
          </div>
          <div className="heatmap-grid">
            {elements.map(el => (
              <div
                key={el.number}
                className="heatmap-cell"
                style={{
                  gridColumn: el.xpos,
                  gridRow: el.ypos,
                  ...getColorStyle(el)
                }}
                title={`${el.name}: ${trend.getValue(el) !== null ? trend.getValue(el) : 'N/A'}`}
              >
                <div className="el-sym">{el.symbol}</div>
                <div className="el-val">{trend.getValue(el) !== null ? Number(trend.getValue(el)).toFixed(1) : '-'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-box glass-panel">
          <div className="an-col">
            <h3><InfoIcon /> Análisis de la Tendencia</h3>
            <p>{trend.analysis}</p>
          </div>
          <div className="an-col concepts-col">
            <h3><BookIcon /> Conceptos Clave</h3>
            <ul>
              {trend.concepts.map((concept, idx) => (
                <li key={idx}>{concept}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
);

export default Trends;
