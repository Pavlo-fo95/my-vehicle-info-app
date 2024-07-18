import React from 'react';
import { Car } from './Car';
import './CarResult.css';

interface CarResultProps {
  car: Car;
}

const CarResult: React.FC<CarResultProps> = ({ car }) => {
  return (
    <div className="car-result-card">
      <img src={car.photo_url} alt={`VIN: ${car.vin}`} />
      <div className="car-result-details">
        <div className="car-result-header">
          <h2>{car.vin} ({car.model_year})</h2>
          <p>Регистрация: {car.operations.length > 0 ? car.operations[0].registered_at : 'N/A'}</p>
        </div>
        <div className="car-result-info">
          <p><strong>Приметы:</strong> {car.notes || 'N/A'}</p>
          <p><strong>Операция:</strong> {car.operations.length > 0 ? car.operations[0].operation.ua : 'N/A'}</p>
          <p><strong>Адрес:</strong> {car.operations.length > 0 ? car.operations[0].department : 'N/A'}, {car.operations.length > 0 ? car.operations[0].address : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CarResult;