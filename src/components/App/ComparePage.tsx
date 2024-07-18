import React from 'react';
import { useCompare } from '../contexts/CompareContext';
import './ComparePage.css';

const ComparePage: React.FC = () => {
  const { selectedCars, removeCar } = useCompare();

  return (
    <div>
      <h1>Сравнение автомобилей</h1>
      <div className="compare-cards">
        {selectedCars.map((car) => (
          <div key={car.digits} className="compare-card">
            <img src={car.photo_url} alt={`${car.model_year} ${car.vin}`} />
            <div className="compare-details">
              <p><strong>Модель:</strong> {car.model}</p>
              <p><strong>Год:</strong> {car.model_year}</p>
              <p><strong>Регион:</strong> {car.region?.name}</p>
              <p><strong>Примечания:</strong> {car.notes || 'N/A'}</p>
            </div>
            <button onClick={() => removeCar(car)} className="remove-button">
              Убрать из сравнения
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePage;