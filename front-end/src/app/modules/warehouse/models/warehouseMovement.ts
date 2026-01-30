import { DateTime } from "luxon";

export interface WarehouseMovement {
    id: number | null;
    movementDateRequest: DateTime | null,
    movementDateAccept: null,
    movementDateCancelled: null,
    warehouseOriginId: number | null,
    warehouseDestinationId: number | null,
    noteRequest: string | null,
    noteAccept: string | null,
    noteCancelled: string | null,
    movementStatusId: number | null,
    userRequestId:number | null,
    userAcceptId:number | null,
    userCancelledId: number | null,
    isActive: boolean | null,
    status : Status | null
}

export interface Status {
    id: number | null;
    name: string | null,
    description: string | null,
    isActive:  boolean | null
}
