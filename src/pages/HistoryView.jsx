import React, { useEffect } from 'react';
import './HistoryView.css';

const HistoryView = () => {
  // En un caso real se cargaría TimelineJS y se instanciaría el mapa en #timeline-embed
  // window.timeline = new TL.Timeline('timeline-embed', data_url);
  
  return (
    <div className="history-page">
      <div className="history-header">
        <h2>Historia de la Tabla Periódica</h2>
        <p>Explora los hitos históricos y descubrimientos a través del tiempo.</p>
      </div>

      <div className="timeline-wrapper glass-panel">
        {/* Placeholder para TimelineJS */}
        <div id="timeline-embed" style={{ width: '100%', height: '600px' }}>
          <div className="tl-placeholder">
            <span className="icon">⏳</span>
            <h3>TimelineJS Container</h3>
            <p>El script de Timeline JS se inyectará en este contenedor ('#timeline-embed').</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
