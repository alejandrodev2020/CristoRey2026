export interface Category  {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

export interface UnitMeasurement {
  id: number;
  name: string;
  description: string;
  isActive: boolean | null;
}