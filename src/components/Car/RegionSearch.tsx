import React, { useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import { Car } from './Car';
import Paginator from '../Pagination/Paginator';
import UkraineMap from './UkraineMap';
import { useCompare } from '../contexts/CompareContext';
import './RegionSearch.css';

const RegionSearch: React.FC = () => {
  const [region, setRegion] = useState<string>('');
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { selectedCars, addCar, removeCar } = useCompare();

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://baza-gai.com.ua/search', {
        headers: {
          'Accept': 'application/json',
          'X-Api-Key': '4be117af1dbedbd5ed4f49f8298805cb',
        },
        params: {
          region,
        },
      });

      console.log('Response data:', response.data);

      const plates = response.data.plates;
      const formattedCars = plates.map((plate: any) => ({
        digits: plate.digits,
        vin: plate.digits,
        region: plate.department,
        price: plate.price || 0,
        photo_url: plate.photo_url || 'https://baza-gai.com.ua/catalog-images/image.jpg',
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
    <div className="region-search">
      <input 
        type="text" 
        value={region} 
        onChange={(e) => setRegion(e.target.value)} 
        placeholder="Регион" 
      />
      <button onClick={handleSearch}>Поиск</button>
      {error && <div>Error: {error}</div>}
      <div>
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
      <UkraineMap />
    </div>
  );
};

export default RegionSearch;