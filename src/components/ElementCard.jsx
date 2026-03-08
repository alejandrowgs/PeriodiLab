import React from 'react';
import { X, Info } from 'lucide-react';
import './ElementCard.css';

const ElementCard = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div className="element-card glass-panel">
      <button className="close-btn" onClick={onClose}><X size={20} /></button>
      
      <div className="card-header">
        <h2 className="title">Detalle del Elemento</h2>
      </div>

      <div className="visualizer">
        <div className="big-symbol">{element.symbol}</div>
        <div className="big-name">{element.name}</div>
        <div className="big-latin">{element.named_by ? `Por: ${element.named_by}` : ''}</div>
      </div>

      <div className="props-grid">
        <div className="prop-item">
          <span className="prop-label">N° ATÓMICO</span>
          <span className="prop-value">{element.number}</span>
        </div>
        <div className="prop-item">
          <span className="prop-label">PESO ATÓMICO</span>
          <span className="prop-value">{element.atomic_mass.toFixed(2)}</span>
        </div>
        <div className="prop-item">
          <span className="prop-label">ESTADO (STP)</span>
          <span className="prop-value">{element.phase}</span>
        </div>
        <div className="prop-item">
          <span className="prop-label">SERIE QUÍMICA</span>
          <span className="prop-value category-val">{element.category}</span>
        </div>
      </div>

      <div className="info-section">
        <h3><Info size={16} /> Información General</h3>
        <p>{element.summary}</p>
      </div>

      <div className="info-section">
        <h3>Configuración Electrónica</h3>
        <div className="config-box">
          {element.electron_configuration_semantic || element.electron_configuration}
        </div>
      </div>
      
    </div>
  );
};

export default ElementCard;
