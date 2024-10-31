import { render, screen, fireEvent } from '@testing-library/react';
import { Historical } from '../Historical.tsx';
import { useFetchHistorical } from '../../components/hooks/useFetchHistorical.ts';
import {vi} from "vitest";


class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver;


// Mock the hook used in the component
vi.mock('../components/hooks/useFetchHistorical');

// Mock implementation for the hook
const mockPortfolios = [
    {
        asOf: '2023-01-01',
        positions: [{ asset: 'Asset 1', quantity: 10 }, { asset: 'Asset 2', quantity: 5 }],
    },
    {
        asOf: '2023-01-02',
        positions: [{ asset: 'Asset 1', quantity: 10 }, { asset: 'Asset 2', quantity: 5 }],
    },
];

const mockPrices = [
    { asset: 'Asset 1', asOf: '2023-01-01', price: 100 },
    { asset: 'Asset 1', asOf: '2023-01-02', price: 110 },
    { asset: 'Asset 2', asOf: '2023-01-01', price: 200 },
    { asset: 'Asset 2', asOf: '2023-01-02', price: 220 },
];

describe('Historical Component', () => {
    beforeEach(() => {
        // @ts-expect-error build error
        (useFetchHistorical as vi.Mock).mockReturnValue({ portfolios: mockPortfolios, prices: mockPrices, error: null });
    });

    test('renders the Historical component correctly', () => {
        render(<Historical />);

        expect(screen.getByText('Historical')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('Performance')).toBeInTheDocument();
    });

    test('changes viewBy', () => {
        render(<Historical />);

        const performanceBtn = screen.getByText("Performance");

        // Click on "Performance"
        fireEvent.click(performanceBtn);
        expect(performanceBtn).toHaveClass('bg-blue-500');

    });

    test('displays no data found message', () => {
        // @ts-expect-error build error
        (useFetchHistorical as vi.Mock).mockReturnValue({ portfolios: [], prices: [], error: null });

        render(<Historical />);

        expect(screen.getByText('Data not found. Please select another date range')).toBeInTheDocument();
    });
});
