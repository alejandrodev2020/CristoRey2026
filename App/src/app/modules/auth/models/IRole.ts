import { RoleId } from "./roles";

export interface IRole {
  id: RoleId;
  name: string;
  description?: string;
  isActive?: boolean;
}