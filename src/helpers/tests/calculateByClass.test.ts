import { calculateByClass } from '../calculateByClass';
import { Asset } from '../../types/Asset';
import { Position } from '../../types/Position';

// Mock implementation of getAssetDetails
// jest.mock('./path-to-your-getAssetDetails-file', () => ({
//     getAssetDetails: jest.fn((assets, assetName) => {
//         return assets.find(asset => asset.name === assetName);
//     })
// }));

describe("calculateByClass", () => {

    it("should calculate total value for different asset types", () => {
        const assets: Asset[] = [
            { id: "1", name: "APPL", type: "stock" },
            { id: "2", name: "BTC", type: "crypto" },
            { id: "3", name: "GOOG", type: "stock" },
            { id: "4", name: "ETH", type: "crypto" },
        ];

        const positions: Position[] = [
            { id: 1, asset: "APPL", quantity: 10, price: 150 },
            { id: 2, asset: "BTC", quantity: 1, price: 30000 },
            { id: 3, asset: "GOOG", quantity: 5, price: 2500 },
            { id: 4, asset: "ETH", quantity: 2, price: 1800 },

        ];

        const result = calculateByClass(assets, positions);

        expect(result).toEqual([
            { name: "stock", value: 14000 },
            { name: "crypto", value: 33600 },
        ]);
    });

    it("should handle a mix of known and unknown assets", () => {
        const assets: Asset[] = [
            { id: "1", name: "APPL", type: "stock" },
            { id: "2", name: "BTC", type: "crypto" },
        ];

        const positions: Position[] = [
            { id: 1, asset: "APPL", quantity: 10, price: 150 },
            { id: 2, asset: "BTC", quantity: 1, price: 30000 },
            { id: 3, asset: "Unknown Asset 1", quantity: 5, price: 100 },
            { id: 4, asset: "Unknown Asset 2", quantity: 2, price: 50 },
        ];

        const result = calculateByClass(assets, positions);


        expect(result).toEqual([
            { name: "stock", value: 1500 },
            { name: "crypto", value: 30000 },
            { name: "Other", value: 600 },
        ]);
    });

    it("should handle assets with undefined/null assetClass", () => {
        const assets: Asset[] = [
            { id: "1", name: "Asset 1", type: "" }, // Or null
            { id: "2", name: "Asset 2", type: "Class B" }
        ];
        const positions: Position[] = [
            { id: 1, asset: "Asset 1", quantity: 1, price: 10 },
            { id: 2, asset: "Asset 2", quantity: 1, price: 20 }
        ]

        const result = calculateByClass(assets, positions);

        expect(result).toEqual([
            { name: "Other", value: 10 }, // Asset 1 defaults to "Other"
            { name: "Class B", value: 20 }  // Asset 2 is classified correctly
        ]);
    });});