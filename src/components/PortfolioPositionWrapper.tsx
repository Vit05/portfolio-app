import {useEffect, useState} from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {Asset} from "../types/Asset";
import {ViewBySelector} from "./ViewBySelector";
import {DateSelection} from "./DateSelection";
import {calculateByAsset} from "../helpers/calculateByAsset";
import {calculateByClass} from "../helpers/calculateByClass";
import {getRandomColorForAsset} from "../helpers/getRandomColorForAsset";
import {useFetchPortfolio} from "./hooks/useFetchPortfolio";
import {useCheckedAssets} from "./hooks/useCheckedAssets";

interface PortfolioPositionWrapperProps {
    assets: Asset[]
    isChartView: boolean
}

interface ChartItem {
    name: string,
    value: number,
}

export const PortfolioPositionWrapper = ({assets, isChartView}: PortfolioPositionWrapperProps) => {

    const [viewBy, setViewBy] = useState("asset");
    const [asOfDate, setAsOfDate] = useState<Date | undefined>(undefined);
    const [chartData, setChartData] = useState<ChartItem[] | null>([]);
    const [filteredChartData, setFilteredChartData] = useState<ChartItem[] | null>([]);

    const { positions, error } = useFetchPortfolio(asOfDate);
    const { checkedAssets, toggleCheckedAsset } = useCheckedAssets();

    useEffect(() => {
        const chartDataFormatted = !positions
            ? null
            : viewBy === "asset"
                ? calculateByAsset(assets, positions)
                : calculateByClass(assets, positions);

        const filteredItems = chartDataFormatted?.filter((item: { name: string; }) =>
            !checkedAssets.includes(item.name)
        ) ?? [];

        setChartData(chartDataFormatted);
        setFilteredChartData(filteredItems);
    }, [positions, viewBy, checkedAssets]);


    const handleStartDateChange = (date: Date) => {
        setAsOfDate(date)
    };


    return (
        error
            ? <div>{error}</div>
            : <div>
                <div className=" flex gap-x-4 flex-row align-center flex-wrap">
                    <ViewBySelector
                        options={["asset", "class"]}
                        selected={viewBy}
                        onSelect={setViewBy}
                    />
                    <DateSelection onSelectStartDate={handleStartDateChange} isRangeEnable={false}/>
                    <div className="flex gap-x-4 flex-row items-center flex-wrap my-4 gap-y-5">
                        <span className={"font-semibold"}>Assets:</span>
                        {assets.map(item => {
                            // Check if the item exists in anotherList
                            const isDisabled = !chartData?.some(anotherItem => anotherItem.name === item.name);

                            return (
                                <label key={item.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={item.name}
                                        checked={!checkedAssets.includes(item.name)}
                                        onChange={() => toggleCheckedAsset(item.name)}
                                        disabled={isDisabled}
                                        className={`mr-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                    <span className={isDisabled ? 'line-through text-gray-500' : ''}>
                                {item.name}
                            </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                {filteredChartData && filteredChartData.length
                    ? isChartView ? <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie data={filteredChartData}
                                 cx="50%"
                                 cy="50%"
                                 fill="#8884d8"
                                 style={{outline: 'none'}}
                                 dataKey="value">
                                {filteredChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getRandomColorForAsset(entry.name)}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer> : <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b bg-gray-200 text-left text-gray-600 font-bold">
                                    Name
                                </th>
                                <th className="px-4 py-2 border-b bg-gray-200 text-left text-gray-600 font-bold">
                                    Value
                                </th>

                            </tr>
                            </thead>
                            <tbody>
                            {filteredChartData.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100`}
                                >
                                    <td className="px-4 py-3 border-b text-gray-800">{item.name}</td>
                                    <td className="px-4 py-3 border-b text-gray-800">{item.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    : <div style={{textAlign: 'center', padding: '100px 0', fontSize: '20px', color: '#8884d8'}}>Data not
                        found. Please select another date</div>}
            </div>
    );
};

