import React, { useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import { Car } from './Car';
import Paginator from '../Pagination/Paginator';
import { useCompare } from '../contexts/CompareContext';
import './AdvancedSearch.css';

const AdvancedSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const { selectedCars, addCar, removeCar } = useCompare();

  const fetchData = async () => {
    try {
      const result = await axios.get(`https://baza-gai.com.ua/advanced-search`, {
        headers: {
          'Accept': 'application/json',
          'X-Api-Key': '4be117af1dbedbd5ed4f49f8298805cb',
        },
        params: {
          query
        }
      });

      const formattedCars = result.data.plates.map((plate: any) => ({
        digits: plate.digits,
        vin: plate.digits,
        region: plate.department.title,
        price: plate.price || 0,
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
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
    <div className="advanced-search">
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
      <button onClick={toggleAdvancedSearch} className="advanced-search-link">Розширений пошук</button>
      {showAdvanced && (
        <div className="search-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Производитель</label>
              <select>
                <option value="">-</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Год выпуска</label>
              <input type="number" placeholder="От" />
              <input type="number" placeholder="До" />
            </div>
            <div className="filter-group">
              <label>Объем</label>
              <input type="number" placeholder="От" />
              <input type="number" placeholder="До" />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Область</label>
              <select>
                <option value="">Вся Украина</option>
                <option value="Киев">Киев</option>
                <option value="Одесса">Одесса</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Двигатель</label>
              <select>
                <option value="">Любой</option>
                <option value="Бензин">Бензин</option>
                <option value="Дизель">Дизель</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Тип кузова</label>
              <select>
                <option value="">Цистерна</option>
                <option value="Седан">Седан</option>
                <option value="Хэтчбек">Хэтчбек</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Цвет</label>
              <select>
                <option value="">Любой</option>
                <option value="Белый">Белый</option>
                <option value="Черный">Черный</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Операция</label>
              <select>
                <option value="">Любая</option>
                <option value="Первичная регистрация">Первичная регистрация</option>
                <option value="Повторная регистрация">Повторная регистрация</option>
              </select>
            </div>
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

export default AdvancedSearch;