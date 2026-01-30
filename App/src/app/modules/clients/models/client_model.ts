export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  phone: string | null;
  ci: string | null;
  nit: string | null;
  file: string | null;
  photo: string | null;
  clientZoneId: number | null;
  clientRateId: number | null;
  clientTypeId: number | null;
  clientDiscountId: number | null;
  ubication: string | null;
  company: string | null;
  latitude: number | null;
  longitude: number | null;
  reference: string | null;
  link: string | null;
  hasPhoto: boolean;
  isActive: boolean;
  zone: {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  };
}