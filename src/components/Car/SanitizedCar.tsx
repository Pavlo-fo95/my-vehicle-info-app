import { Car } from './Car';

export interface SanitizedCar extends Omit<Car, 'operation' | 'department'> {
  operation: {
    group: string;
    code: number;
    title_ru: string;
    title_uk: string;
  };
  department: {
    title: string;
    address: string;
  };
}