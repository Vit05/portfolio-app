import {Asset} from "../types/Asset";
import {Position} from "../types/Position";

export const calculateByAsset = (assets: Asset[], positions: Position[]) =>
    positions.map((pos) => {
        return {
            name: assets.find((asset) => asset.name === pos.asset)?.name || "Unknown",
            value: pos.quantity * pos.price,
        }
    });