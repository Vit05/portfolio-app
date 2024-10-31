import {Asset} from "../types/Asset";
import {Position} from "../types/Position";
import {getAssetDetails} from "./getAssetDetails";

export const calculateByClass = (assets: Asset[], positions: Position[]) => {
    const classBalance: { [key: string]: number } = {};
    positions.forEach((pos) => {
        const asset = getAssetDetails(assets, pos.asset);
        const assetClass = asset?.type || "Other";
        if (!classBalance[assetClass]) {
            classBalance[assetClass] = 0;
        }
        classBalance[assetClass] += pos.quantity * pos.price;
    });

    return Object.entries(classBalance).map(([name, value]) => ({name, value}));
};