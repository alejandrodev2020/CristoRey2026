export interface Client {
  id: number | null;
  firstName: string;
  lastName: string;
  phone: string;
  ci: string;
  nit: string;
  photo: string | null;
  ubication: string;
  company: string;
  isActive: boolean;
  clientZoneId: number; 
  hasPhoto: boolean; 
  latitude: number; 
  longitude: number; 
  link: string; 
  reference: string; 
  doctorId: number | null;
  zone: { 
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  };
  file: any | null; 
}




  export interface GeolocationPosition {
    coords: {
      latitude: number;  
      longitude: number; 
      accuracy: number;  
    };
    timestamp: number;  
  }