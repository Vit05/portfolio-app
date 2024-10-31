import DatePicker from "react-datepicker";
import {CalendarDaysIcon} from '@heroicons/react/24/outline'
import {useDateSelection} from "./hooks/useDateSelection";


interface DateSelectionProps {
    onSelectStartDate: (value: Date ) => void;
    isRangeEnable?: boolean;
    onSelectEndDate?: (value: Date) => void;
}

export const DateSelection = ({
                                  isRangeEnable,
                                  onSelectStartDate,
                                  onSelectEndDate,
                              }: DateSelectionProps) => {


    const { startDate, setStartDate, endDate, setEndDate } = useDateSelection({isRangeEnable, onSelectStartDate, onSelectEndDate});

    return (
        <div className="flex flex-row items-center flex-wrap gap-4">
            <div id="root-datepicker-portal" className={`flex gap-x-4 flex-row items-center flex-wrap ${isRangeEnable ? "w-80": ""}`}><span
                className={"font-semibold whitespace-nowrap"}>{isRangeEnable ? "Date Start:" : "Select Date As Of:"}</span>
                <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    selected={startDate}
                    onChange={(date) => setStartDate(date as Date)}
                    className="border rounded p-2"
                    dateFormat="yyyy-MM-dd"
                    popperPlacement="top-end"
                    icon={<CalendarDaysIcon/>}
                /></div>
            {isRangeEnable && (
                <div className="flex gap-x-4 flex-row items-center">
                    <span className={"font-semibold"}>Date End:</span>
                    <DatePicker
                        showIcon
                        toggleCalendarOnIconClick
                        selected={endDate}
                        onChange={(date) => setEndDate(date as Date)}
                        className="border rounded p-2"
                        dateFormat="yyyy-MM-dd"
                        popperPlacement="top-end"
                        icon={<CalendarDaysIcon/>}
                    />
                </div>
            )}
        </div>
    );
};

