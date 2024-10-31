import {Asset} from "../types/Asset";

// Helper function to get asset details by assetId
export const getAssetDetails = (assets: Asset[], assetName: string) => {
    return assets.find((asset) => asset.name === assetName);
};