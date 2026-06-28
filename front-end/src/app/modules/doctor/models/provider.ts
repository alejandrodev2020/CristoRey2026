export interface Provider {
    id: number | null;
    firstName: string;
    lastName: string;
    phone: string;
    ci: string;
    nit: string;
    photo: string | null;
    specialty: string | null;
    ubication: string;
    zoneId: number;
    zone: BaseClassifier;
    latitude: number;
    longitude: number;
    link: string;
    isEmergency: boolean | null;
    isActive: boolean;
}

export interface BaseClassifier {
    id: number;
    name?: string | null;
    description: string;
    isActive?: boolean | null;
}