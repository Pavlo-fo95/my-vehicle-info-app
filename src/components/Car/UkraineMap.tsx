import React from 'react';
import { SVGMap } from 'react-svg-map';
import ukraine from '@svg-maps/ukraine';
import './UkraineMap.css'; 

const UkraineMap: React.FC = () => {
  return <SVGMap map={ukraine} className="svg-map" />;
};

export default UkraineMap;