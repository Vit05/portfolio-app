import {useEffect, useState} from 'react';
import {Portfolio} from "../types/Portfolio";
import 'react-datepicker/dist/react-datepicker.css';
import {ViewBySelector} from "../components/ViewBySelector";
import {DateSelection} from "../components/DateSelection";
import {HistoricalChart} from "../components/HistoricalChart";
import {useFetchHistorical} from "../components/hooks/useFetchHistorical";
import {FinancialData} from "../types/FinancialData.ts";


export const Historical = () => {

    const [viewBy, setViewBy] = useState<string>("value");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [chartData, setChartData] = useState<FinancialData[] | undefined>(undefined);

    const { portfolios, prices, error } = useFetchHistorical(startDate, endDate);

    useEffect(() => {
        if(prices && portfolios){
            setChartData(prepareChartData())
        }
    }, [portfolios, prices, viewBy]);

    const handleStartDateChange = (date: Date) => {
        setStartDate(date)
    };
    const handleEndDateChange = (date: Date) => {
        setEndDate(date)
    };


    const getCurrentPrice = (asset: string, asOf: string) => {
        const priceObj = prices?.find((price) => price.asset === asset && price.asOf === asOf);
        return priceObj ? priceObj.price : 0;
    };

    const calculateTotalValue = (portfolio: Portfolio) => {
        return portfolio.positions.reduce((sum, position) => sum + position.quantity * getCurrentPrice(position.asset, portfolio.asOf), 0);
    };

    const prepareChartData = () => {

        const chartData = portfolios?.map((portfolio) => {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            const dataPoint: any = {
                date: portfolio.asOf,
                total: calculateTotalValue(portfolio),
            };
            // Add asset prices to the chart data
            portfolio.positions.forEach((position) => {
                dataPoint[position.asset] = getCurrentPrice(position.asset, portfolio.asOf);
            });

            return dataPoint;
        });

        if (viewBy === 'performance') {
            //We need a starting value from which to build on and show performance
            const initialValue = chartData && chartData[0]?.total || 1;
            return chartData?.map((data) => ({
                date: data.date,
                total: ((data.total - initialValue) / initialValue) * 100,
            }));
        }
        return chartData;
    };


    return (<>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Historical</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mb-4 flex gap-x-4 flex-row align-center flex-wrap">
                            <ViewBySelector
                                options={["value", "performance"]}
                                selected={viewBy}
                                onSelect={setViewBy}
                            />

                            <DateSelection isRangeEnable={true}
                                           onSelectStartDate={handleStartDateChange}
                                           onSelectEndDate={handleEndDateChange}/>

                        </div>
                        {chartData && prices && <HistoricalChart viewBy={viewBy} data={chartData} prices={prices} error={error}/>}
                    </div>
                </main>
            </>


    );
};
