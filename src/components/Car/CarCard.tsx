import React from 'react';
import { Car } from './Car';
import './CarCard.css';

interface CarCardProps {
  car: Car;
  onCompareToggle: (car: Car) => void;
  isSelected: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onCompareToggle, isSelected }) => {
  const handleSelect = () => {
    onCompareToggle(car);
  };

  return (
    <div className={`car-card ${isSelected ? 'selected' : ''}`}>
      <h2>{car.model_year} {car.vin}</h2>
      <img src={car.photo_url} alt={`${car.model_year} ${car.vin}`} />
      <p className="detail"><span className="label">Регион:</span> {car.region?.name}</p>
      <p className="detail"><span className="label">Операция:</span> {car.operations?.length > 0 ? car.operations[0].operation.ua : 'N/A'}</p>
      <p className="detail"><span className="label">Департамент:</span> {car.operations?.length > 0 ? car.operations[0].department : 'N/A'}</p>
      <p className="detail"><span className="label">Дата регистрации:</span> {car.operations?.length > 0 ? car.operations[0].registered_at : 'N/A'}</p>
      <p className="detail"><span className="label">Год модели:</span> {car.model_year}</p>
      <button onClick={handleSelect}>{isSelected ? 'Убрать из сравнения' : 'Добавить к сравнению'}</button>
    </div>
  );
};

export default CarCard;