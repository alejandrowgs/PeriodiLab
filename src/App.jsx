import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explorer from './pages/Explorer';
import Trends from './pages/Trends';
import HistoryView from './pages/HistoryView';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content" style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/history" element={<HistoryView />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<Navigate to="/explorer" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
