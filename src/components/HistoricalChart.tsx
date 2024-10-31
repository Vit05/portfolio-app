import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getRandomColorForAsset} from "../helpers/getRandomColorForAsset";
import {Price} from "../types/Price";
import {FinancialData} from "../types/FinancialData.ts";

interface HistoricalChartProps {
    viewBy: string;
    data: FinancialData[];
    prices: Price[]
    error: string | null
}

export const HistoricalChart = ({viewBy, data, prices, error}: HistoricalChartProps) => {
    const uniqueAssets = Array.from(new Set(prices.map((price) => price.asset)));

    return (
        <>
            <ResponsiveContainer width="100%" height={400}>
                {error ? <p className="text-red-500 mt-2">{error}</p> :
                    data.length || prices.length ? <LineChart data={data}>
                            <CartesianGrid strokeDasharray="7 7"/>
                            <XAxis dataKey="date"/>
                            <YAxis tickCount={10}
                                   tickFormatter={(value: number) => (viewBy === 'performance' ? `${value}%` : `$${value / 1000}K`)}/>
                            <Tooltip
                                formatter={(value: number) => (viewBy === 'performance' ? `${value.toFixed(2)}%` : `$${value}`)}/>
                            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3}/>
                            Dynamically add asset price lines
                            {uniqueAssets.map((asset) => (
                                <Line
                                    key={asset}
                                    type="monotone"
                                    dataKey={asset}
                                    stroke={getRandomColorForAsset(asset)}
                                    dot={true}
                                />
                            ))}
                        </LineChart> :
                        <div style={{textAlign: 'center', padding: '100px 0', fontSize: '20px', color: '#8884d8'}}>Data
                            not
                            found. Please select another date range</div>}
            </ResponsiveContainer>
        </>
    );
}
