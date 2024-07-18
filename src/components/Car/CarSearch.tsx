import React, { useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import { Car } from './Car';
import Paginator from '../Pagination/Paginator';
import { useCompare } from '../contexts/CompareContext';
import './CarSearch.css';

const CarSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { selectedCars, addCar, removeCar } = useCompare();

  const fetchData = async () => {
    try {
      const result = await axios.get(`https://baza-gai.com.ua/nomer/${query}`, {
        headers: {
          'Accept': 'application/json',
          'X-Api-Key': '4be117af1dbedbd5ed4f49f8298805cb',
        },
      });

      const formattedCars = result.data.plates.map((plate: any) => ({
        digits: plate.digits,
        vin: plate.digits,
        region: plate.region,
        price: 0,
        operations: plate.operations,
        comments: plate.comments,
        vendor: plate.vendor || '',
        model: plate.model || 'Легковой',
        model_year: plate.model_year || 0,
        notes: plate.notes || '',
        is_stolen: plate.is_stolen || false,
        stolen_details: plate.stolen_details || null,
      }));

      setCars(formattedCars);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected);
  };

  const handleCompareToggle = (car: Car) => {
    if (selectedCars.some(selectedCar => selectedCar.digits === car.digits)) {
      removeCar(car);
    } else {
      addCar(car);
    }
  };

  return (
    <div className="car-search">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Номерной знак или VIN" 
          className="search-input"
        />
        <button type="submit" className="search-button">Пошук</button>
      </form>
      {error && <div>{error}</div>}
      <div className="cars-list">
        {cars.length > 0 ? (
          cars.slice(page * 10, (page + 1) * 10).map(car => (
            <CarCard
              key={car.digits}
              car={car}
              onCompareToggle={handleCompareToggle}
              isSelected={selectedCars.some(selectedCar => selectedCar.digits === car.digits)}
            />
          ))
        ) : (
          <div>No cars available</div>
        )}
      </div>
      <Paginator pageCount={Math.ceil(cars.length / 10)} onPageChange={handlePageClick} />
    </div>
  );
};

export default CarSearch;