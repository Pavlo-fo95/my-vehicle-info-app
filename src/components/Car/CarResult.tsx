import React, { useState } from 'react';
import { Car } from './Car';
import CustomSearchInput from '../Car/CustomSearchInput';
import './CarResult.css';

interface CarResultProps {
  car: Car;
}

const CarResult: React.FC<CarResultProps> = ({ car }) => {
  const [filteredOperations, setFilteredOperations] = useState(car.operations);

  const handleSearch = (term: string) => {
    console.log('Search term:', term);

    if (!term) {
      setFilteredOperations(car.operations);
    } else {
      const filtered = car.operations.filter(operation =>
        operation.operation.ua.toLowerCase().includes(term.toLowerCase()) ||
        operation.department.toLowerCase().includes(term.toLowerCase()) ||
        operation.address.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOperations(filtered);
    }
  };

  return (
    <div className="car-result-card">
      <CustomSearchInput onSearch={handleSearch} />
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
        <div className="car-result-operations">
          <h3>Операции:</h3>
          {filteredOperations.length > 0 ? (
            filteredOperations.map((operation, index) => (
              <div key={index} className="operation">
                <p><strong>Операция:</strong> {operation.operation.ua}</p>
                <p><strong>Отделение:</strong> {operation.department}</p>
                <p><strong>Адрес:</strong> {operation.address}</p>
                <p><strong>Дата регистрации:</strong> {operation.registered_at}</p>
              </div>
            ))
          ) : (
            <p>Нет операций, соответствующих поисковому запросу.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarResult;