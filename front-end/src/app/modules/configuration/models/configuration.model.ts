import { AuthUserConfiguration } from "app/modules/auth/models/authUser.configuration.model";
import { Classifier } from "app/modules/warehouse/models/warehouseProduct";

export interface Configuration {
    id: number | null;
    code: string;
    paymentTypeCash:  boolean | null;
    paymentTypeQr:  boolean | null;
    paymentTypeCard:  boolean | null;
    warehouseId :  number | null;
    pettyCashId :  number | null;
    planId :  number | null;
    plan : Classifier;
    isActive: boolean | null;
    authUserConfiguration : AuthUserConfiguration | null;
  }
  