import { calculateByAsset } from '../calculateByAsset.ts';
import { Asset } from '../../types/Asset';
import { Position } from '../../types/Position';

describe('calculateByAsset tests', () => {
    it('should calculate total value by asset correctly', () => {
        const assets: Asset[] = [
            { id: '1', name: 'Stock A', type: "stock"},
            { id: '2', name: 'Stock B', type: "stock"},
            { id: '3', name: 'Stock C', type: "crypto"}
        ];

        const positions: Position[] = [
            { id: 1, asset: 'Stock A', quantity: 10, price: 100 },
            { id: 2, asset: 'Stock B', quantity: 5, price: 200 },
            { id: 3, asset: 'Stock C', quantity: 0, price: 150 }, // This should yield value 0
            { id: 4, asset: 'Unknown Stock', quantity: 3, price: 50 } // This should return "Unknown" for the name
        ];

        const result = calculateByAsset(assets, positions);

        expect(result).toEqual([
            { name: 'Stock A', value: 1000 }, // 10 * 100
            { name: 'Stock B', value: 1000 }, // 5 * 200
            { name: 'Stock C', value: 0 },     // 0 * 150
            { name: 'Unknown', value: 150 }    // 3 * 50 => Unknown
        ]);
    });

    it('should return Unknown for assets not found in the assets array', () => {
        const assets: Asset[] = [
            { id: '1', name: 'Asset A', type: 'stock' },
            { id: '2', name: 'Asset B', type: 'fiat' }
        ];

        const positions: Position[] = [
            { id: 1, asset: 'Asset A', quantity: 1, price: 50 },
            { id: 2, asset: 'Nonexistent Asset', quantity: 2, price: 30 }
        ];

        const result = calculateByAsset(assets, positions);

        expect(result).toEqual([
            { name: 'Asset A', value: 50 },       // 1 * 50
            { name: 'Unknown', value: 60 }        // 2 * 30 => Unknown
        ]);
    });
});
