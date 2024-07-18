import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../Car/Car';

interface CompareContextType {
  selectedCars: Car[];
  addCar: (car: Car) => void;
  removeCar: (car: Car) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

interface CompareProviderProps {
  children: ReactNode;
}

export const CompareProvider: React.FC<CompareProviderProps> = ({ children }) => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);

  const addCar = (car: Car) => {
    setSelectedCars((prevCars) => [...prevCars, car]);
  };

  const removeCar = (car: Car) => {
    setSelectedCars((prevCars) => prevCars.filter((c) => c.digits !== car.digits));
  };

  return (
    <CompareContext.Provider value={{ selectedCars, addCar, removeCar }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};