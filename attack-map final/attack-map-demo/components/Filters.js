import React from 'react';

function Filters({ onFilterChange }) {
  return (
    <div>
      <h4>Filters</h4>
      <label>
        Severity:
        <select onChange={(e) => onFilterChange({ severity: e.target.value })}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <label>
        Type:
        <select onChange={(e) => onFilterChange({ type: e.target.value })}>
          <option value="DDoS">DDoS</option>
          <option value="Phishing">Phishing</option>
          <option value="Malware">Malware</option>
        </select>
      </label>
      {/* Add more filters as needed */}
    </div>
  );
}

export default Filters;