import React from 'react';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import ukraine from '@svg-maps/ukraine';

const UkraineMap: React.FC = () => {
  return <SVGMap map={ukraine} />;
};

export default UkraineMap;