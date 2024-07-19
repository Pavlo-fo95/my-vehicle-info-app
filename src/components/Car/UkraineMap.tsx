import React from 'react';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import ukraine from '@svg-maps/ukraine';
import './UkraineMap.css';

const UkraineMap: React.FC = () => {
  return <SVGMap map={ukraine} className="svg-map" />;
};

export default UkraineMap;