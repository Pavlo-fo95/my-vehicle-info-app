import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ukraineMap from './ukraine-topo.json';
import './MapView.css';

const MapView: React.FC = () => {
  return (
    <div className="map-container">
      <h2>Карта Украины</h2>
      <ComposableMap projection="geoAlbers">
        <Geographies geography={ukraineMap}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapView;