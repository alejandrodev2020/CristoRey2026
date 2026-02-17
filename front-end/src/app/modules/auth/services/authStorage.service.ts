import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
    setSession(data: any): void {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userLogged', JSON.stringify({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            avatar: data.avatar,
            isAdmin: data.isAdmin,
            warehouseId: data.warehouseId,
        }));

        localStorage.setItem('role', JSON.stringify(data.authRole));
        localStorage.setItem('configuration', JSON.stringify(data.configuration));
        localStorage.setItem('userConfiguration', JSON.stringify(data.authUserConfiguration));
        localStorage.setItem('viewAlert', 'false');
        localStorage.setItem('company',  JSON.stringify(data.company));
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUser(): any {
        const user = localStorage.getItem('userLogged');
        return user ? JSON.parse(user) : null;
    }

    getRole(): any {
        const role = localStorage.getItem('role');
        return role ? JSON.parse(role) : null;
    }

    getConfiguration(): any {
        const config = localStorage.getItem('configuration');
        return config ? JSON.parse(config) : null;
    }

    getUserConfiguration(): any {
        const config = localStorage.getItem('userConfiguration');
        return config ? JSON.parse(config) : null;
    }

    clear(): void {
        localStorage.clear();
    }
}