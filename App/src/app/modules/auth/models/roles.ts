export type RoleId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Role {
  id: RoleId;
  name: 'Administrador' | 'Cajero' | 'Vendedor' | 'Colaborador' | 'Impulsador' | 'Repartidor';
  description?: string;
  isActive?: boolean;
}

export const ROLES: Role[] = [
  { id: 1, name: 'Administrador', description: 'Administrador', isActive: true },
  { id: 2, name: 'Cajero', description: 'Cajero', isActive: true },
  { id: 3, name: 'Vendedor', description: 'Vendedor', isActive: true },
  { id: 4, name: 'Colaborador', description: 'Colaborador', isActive: true },
  { id: 5, name: 'Impulsador', description: 'Impulsador', isActive: true },
  { id: 6, name: 'Repartidor', description: 'Repartidor', isActive: true },
];

export const getRoleById = (id: number): Role | undefined =>
  ROLES.find(r => r.id === id);

export const isValidRoleId = (id: number): id is RoleId =>
  ROLES.some(r => r.id === id);