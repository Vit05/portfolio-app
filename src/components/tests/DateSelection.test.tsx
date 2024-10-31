import { render, screen, fireEvent } from "@testing-library/react";
import {vi} from 'vitest';
import '@testing-library/jest-dom';
import {DateSelection} from '../DateSelection.tsx';
import moment from "moment";

describe('DateSelection Component', () => {
    it('should render DatePicker for start date', () => {
        const onSelectStartDate = vi.fn();
        render(<DateSelection onSelectStartDate={onSelectStartDate} />);

        expect(screen.getByText('Select Date As Of:')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should call onSelectStartDate when start date is changed', () => {
        const onSelectStartDate = vi.fn();
        render(<DateSelection onSelectStartDate={onSelectStartDate} />);

        const dateInput = screen.getByRole('textbox');
        fireEvent.change(dateInput, { target: { value: '2024-10-30' } });
        fireEvent.blur(dateInput);

        // Convert to YYYY-MM-DD format for comparison
        const expectedDate = moment('2024-10-30').format('YYYY-MM-DD');
        const calledDate = moment(onSelectStartDate.mock.calls[0][0]).format('YYYY-MM-DD');
        expect(calledDate).toBe(expectedDate);
    });

    it('should render DatePicker for end date if isRangeEnable is true', () => {
        const onSelectStartDate = vi.fn();
        const onSelectEndDate = vi.fn();

        render(
            <DateSelection
                isRangeEnable={true}
        onSelectStartDate={onSelectStartDate}
        onSelectEndDate={onSelectEndDate}
        />
    );

        expect(screen.getByText('Date Start:')).toBeInTheDocument();
        expect(screen.getByText('Date End:')).toBeInTheDocument();
    });

    it('should call onSelectEndDate when end date is changed', () => {
        const onSelectStartDate = vi.fn();
        const onSelectEndDate = vi.fn();

        render(
            <DateSelection
                isRangeEnable={true}
        onSelectStartDate={onSelectStartDate}
        onSelectEndDate={onSelectEndDate}
        />
    );

        const endDateInput = screen.getAllByRole('textbox')[1]; // Second DatePicker is for end date
        fireEvent.change(endDateInput, { target: { value: '2024-10-30' } });
        fireEvent.blur(endDateInput);

        const expectedDate = moment('2024-10-30').format('YYYY-MM-DD');
        const calledDate = moment(onSelectEndDate.mock.calls[0][0]).format('YYYY-MM-DD');
        expect(calledDate).toBe(expectedDate);
    });
});
