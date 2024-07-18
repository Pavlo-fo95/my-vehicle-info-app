import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import { Car } from './Car';
import Paginator from '../Pagination/Paginator';
import './CarCard.css';

const MakeModelSearch: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://baza-gai.com.ua/search', {
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': '4be117af1dbedbd5ed4f49f8298805cb'
          },
          params: {
            vendor: 'bmw',  
            catalog_model: 'c-klasse',  
          }
        });

        if (result.data && result.data.plates) {
          const formattedCars = result.data.plates.map((plate: any) => ({
            digits: plate.digits || plate.vin,
            vin: plate.digits,
            region: plate.department.title,
            price: 0,
            photo_url: plate.photo_url || 'https://baza-gai.com.ua/catalog-images/image.jpg',
            operations: plate.operations,
            department: plate.department,
            registered_at: plate.registered_at,
            model_year: plate.model_year,
            notes: plate.notes
          }));

          setCars(formattedCars);
          setError(null);
          setPage(0);
        } else {
          setCars([]);
          setError('No cars found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected);
  };

  const carsPerPage = 10;

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div>
        {cars.length > 0 ? (
          cars.slice(page * carsPerPage, (page + 1) * carsPerPage).map(car => (
            <CarCard key={car.digits} car={car} onCompareToggle={function (car: Car): void {
              throw new Error('Function not implemented.');
            } } isSelected={false} />
          ))
        ) : (
          <div>No cars available</div>
        )}
      </div>
      <Paginator pageCount={Math.ceil(cars.length / carsPerPage)} onPageChange={handlePageClick} />
    </div>
  );
};

export default MakeModelSearch;