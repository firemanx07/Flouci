import {type ReactNode} from "react";

export type AccessoryRenderFunction = (
    size: number,
    color: string,
) => ReactNode;
export interface TextInputAccessoryProps  {
    leftAccessory?: AccessoryRenderFunction;
    rightAccessory?: AccessoryRenderFunction;
}
