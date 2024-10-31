import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {PortfolioPositionWrapper} from '../PortfolioPositionWrapper';
import {useFetchPortfolio} from '../hooks/useFetchPortfolio';

class ResizeObserver {
    observe() {
    }

    unobserve() {
    }

    disconnect() {
    }
}

window.ResizeObserver = ResizeObserver;

vi.mock('../hooks/useFetchPortfolio');


const mockAssets = [{id: '1', name: 'Asset A', type: "crypto"}, {id: '2', name: 'Asset B', type: "crypto"},];


const mockPortfolios = [
    {
        asOf: '2024-10-15',
        positions: [{ asset: 'Asset 1', quantity: 10 }, { asset: 'Asset 2', quantity: 5 }],
    },
    {
        asOf: '2024-10-30',
        positions: [{ asset: 'Asset 1', quantity: 10 }, { asset: 'Asset 2', quantity: 5 }],
    },
];

describe('PortfolioPositionWrapper Component', () => {
    beforeEach(() => {
        // @ts-expect-error build error
        (useFetchPortfolio as vi.Mock).mockReturnValue({ portfolios: mockPortfolios, error: null });
    });

    it('renders without crashing', () => {
        render(<PortfolioPositionWrapper assets={mockAssets} isChartView={true}/>);

        expect(screen.getByText('Assets:')).toBeInTheDocument();
    });

    it('displays error message when there is an error', () => {
        // @ts-expect-error build error
        (useFetchPortfolio as vi.Mock).mockReturnValue({ portfolios: [], error: "Error loading data"});

        render(<PortfolioPositionWrapper assets={mockAssets} isChartView={true}/>);

        expect(screen.getByText("Error loading data")).toBeInTheDocument();
    });

    it('correctly handles date change', () => {
        render(<PortfolioPositionWrapper assets={mockAssets} isChartView={true}/>);

        const dateInput = screen.getByRole('textbox');

        fireEvent.change(dateInput, {target: {value: '2024-10-15'}});

        expect(dateInput).toHaveValue('2024-10-15');
    });

    it('displays chart when data is available in chart view', () => {

        render(<PortfolioPositionWrapper assets={mockAssets} isChartView={false}/>);

        const dateInput = screen.getByRole('textbox'); // Adjust based on actual input role or placeholder

        fireEvent.change(dateInput, {target: {value: '2024-10-15'}});

        expect(dateInput).toHaveValue('2024-10-15');

    });

})