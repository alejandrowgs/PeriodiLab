import React from 'react';
import './PeriodicTable.css';

const categoryColorMap = {
  'alkali metal': 'cat-alkali',
  'alkaline earth metal': 'cat-alkaline-earth',
  'transition metal': 'cat-transition',
  'post-transition metal': 'cat-post-transition',
  'metalloid': 'cat-metalloid',
  'diatomic nonmetal': 'cat-nonmetal',
  'polyatomic nonmetal': 'cat-nonmetal',
  'halogen': 'cat-halogen',
  'noble gas': 'cat-noble',
  'lanthanide': 'cat-lanthanide',
  'actinide': 'cat-actinide',
};

const getCategoryClass = (category) => {
  if (!category) return 'cat-unknown';
  for (const [key, val] of Object.entries(categoryColorMap)) {
    if (category.toLowerCase().includes(key)) return val;
  }
  return 'cat-unknown';
};

const PeriodicTable = ({ elements, onElementClick, selectedElement, filterState }) => {
  return (
    <div className="periodic-table">
      {elements.map((el) => {
        // Filter logic: if state filter is active and doesn't match, we dim it
        const isNotMatched = filterState && filterState !== 'all' && el.phase?.toLowerCase() !== filterState.toLowerCase();
        
        return (
          <div
            key={el.number}
            className={`element-cell ${getCategoryClass(el.category)} ${
              selectedElement?.number === el.number ? 'selected' : ''
            } ${isNotMatched ? 'dimmed' : ''}`}
            style={{
              gridColumn: el.xpos,
              gridRow: el.ypos,
            }}
            onClick={() => onElementClick(el)}
          >
            <div className="el-number">{el.number}</div>
            <div className="el-symbol">{el.symbol}</div>
            <div className="el-name">{el.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PeriodicTable;
