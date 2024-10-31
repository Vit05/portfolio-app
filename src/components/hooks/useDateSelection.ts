import {useEffect, useState} from "react";
import moment from "moment";


interface DateSelectionProps {
    onSelectStartDate: (value: Date ) => void;
    isRangeEnable?: boolean;
    onSelectEndDate?: (value: Date) => void;
}

export const useDateSelection = ({isRangeEnable, onSelectStartDate, onSelectEndDate}:DateSelectionProps) => {
    const currentDate = new Date();
    const initialStartDate = isRangeEnable ? new Date(moment(currentDate).startOf('month').format("YYYY-MM-DD")) : currentDate;

    const [startDate, setStartDate] = useState<Date>(initialStartDate);
    const [endDate, setEndDate] = useState<Date>(new Date());

    useEffect(() => {
        onSelectStartDate(startDate);
    }, [startDate, onSelectStartDate]);

    useEffect(() => {
        if (isRangeEnable && onSelectEndDate) {
            onSelectEndDate(endDate);
        }
    }, [endDate, isRangeEnable, onSelectEndDate]);

    return { startDate, setStartDate, endDate, setEndDate };
};