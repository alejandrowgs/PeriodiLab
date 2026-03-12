import React, { useState, useEffect } from 'react';
import PeriodicTable from '../components/PeriodicTable';
import ElementCard from '../components/ElementCard';
import elementsData from '../data/PeriodicTableJSON.json';
import { translateElement } from '../data/translations';
import './Explorer.css';

const Explorer = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filterState, setFilterState] = useState('all');

  useEffect(() => {
    const data = elementsData.elements || elementsData;
    setElements(data.map(translateElement));
  }, []);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const closeCard = () => {
    setSelectedElement(null);
  };

  return (
    <div className="explorer-page">
      <div className={`table-container ${selectedElement ? 'with-sidebar' : ''}`}>
        
        {/* Top Controls Box */}
        <div className="controls-box">
          <div className="filter-group glass-panel">
            <button 
              className={`filter-btn ${filterState === 'all' ? 'active' : ''}`}
              onClick={() => setFilterState('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${filterState === 'solid' ? 'active' : ''}`}
              onClick={() => setFilterState('solid')}
            >
              Sólidos
            </button>
            <button 
              className={`filter-btn ${filterState === 'liquid' ? 'active' : ''}`}
              onClick={() => setFilterState('liquid')}
            >
              Líquidos
            </button>
            <button 
              className={`filter-btn ${filterState === 'gas' ? 'active' : ''}`}
              onClick={() => setFilterState('gas')}
            >
              Gases
            </button>
          </div>

          <div className="legend-group glass-panel">
            <span className="legend-title">Índice:</span>
            <span className="legend-item cat-alkali">Alcalinos</span>
            <span className="legend-item cat-alkaline-earth">Alcalinotérreos</span>
            <span className="legend-item cat-transition">Transición</span>
            <span className="legend-item cat-metalloid">Metaloides</span>
            <span className="legend-item cat-nonmetal">No Metales</span>
            <span className="legend-item cat-halogen">Halógenos</span>
            <span className="legend-item cat-noble">Gases Nobles</span>
          </div>
        </div>

        <div className="ptable-wrapper">
          <PeriodicTable 
            elements={elements} 
            onElementClick={handleElementClick}
            selectedElement={selectedElement}
            filterState={filterState}
          />
        </div>
      </div>

      {selectedElement && (
        <div className="sidebar-container">
          <ElementCard element={selectedElement} onClose={closeCard} />
        </div>
      )}
    </div>
  );
};

export default Explorer;
