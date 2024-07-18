import React, { useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import { Car } from './Car';
import Paginator from '../Pagination/Paginator';
import { useCompare } from '../contexts/CompareContext';
import './VinSearch.css';

const VinSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const { selectedCars, addCar, removeCar } = useCompare();

  const fetchData = async (query: string) => {
    try {
      const result = await axios.get(`https://baza-gai.com.ua/nomer/${query}`, {
        headers: {
          'Accept': 'application/json',
          'X-Api-Key': '4be117af1dbedbd5ed4f49f8298805cb',
        },
      });

      const car: Car = {
        digits: result.data.digits,
        vin: result.data.vin,
        region: result.data.region,
        vendor: result.data.vendor || '',
        model: result.data.model || 'Легковой',
        model_year: result.data.model_year || 0,
        photo_url: result.data.photo_url || 'https://baza-gai.com.ua/catalog-images/image.jpg',
        is_stolen: result.data.is_stolen || false,
        stolen_details: result.data.stolen_details || null,
        operations: result.data.operations,
        comments: result.data.comments,
        notes: undefined,
        price: undefined
      };

      setCars([car]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(query);
  };

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleCompareToggle = (car: Car) => {
    if (selectedCars.some(selectedCar => selectedCar.digits === car.digits)) {
      removeCar(car);
    } else {
      addCar(car);
    }
  };

  return (
    <div className="vin-search">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Номерной знак или VIN" 
          className="search-input"
        />
        <button type="submit" className="search-button">Поиск</button>
      </form>
      <button className="advanced-search-toggle" onClick={toggleAdvancedSearch}>Розширений пошук</button>
      {showAdvanced && (
        <div className="advanced-search">
          <div className="filter-row">
            <div className="filter-group">
              <label>Производитель</label>
              <input type="text" placeholder="Производитель" />
            </div>
            <div className="filter-group">
              <label>Год выпуска</label>
              <input type="number" placeholder="От" />
              <input type="number" placeholder="До" />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Область</label>
              <input type="text" placeholder="Область" />
            </div>
            <div className="filter-group">
              <label>Цвет</label>
              <input type="text" placeholder="Цвет" />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Двигатель</label>
              <input type="text" placeholder="Двигатель" />
            </div>
            <div className="filter-group">
              <label>Объем</label>
              <input type="number" placeholder="От" />
              <input type="number" placeholder="До" />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Тип кузова</label>
              <input type="text" placeholder="Тип кузова" />
            </div>
            <div className="filter-group">
              <label>Операция</label>
              <select>
                <option value="">Любая</option>
                <option value="Первичная регистрация">Первичная регистрация</option>
                <option value="Повторная регистрация">Повторная регистрация</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Регистрация</label>
              <input type="number" placeholder="От" defaultValue="2013" />
              <input type="number" placeholder="До" defaultValue="2024" />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>КОАТУУ</label>
              <input type="text" placeholder="Код КОАТУУ" />
            </div>
          </div>
          <button type="submit" className="search-button">Поиск</button>
        </div>
      )}
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

export default VinSearch;