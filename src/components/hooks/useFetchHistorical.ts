import {useEffect, useState} from "react";
import {Price} from "../../types/Price";
import {Portfolio} from "../../types/Portfolio";
import {getPortfolio, getPrices} from "../../api/api";
import moment from "moment";

export const useFetchHistorical = (startDate: Date | null, endDate: Date | null) => {
    const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
    const [prices, setPrices] = useState<Price[] |null >(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (startDate && endDate) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const portfolioData = await getPortfolio({
                        from: moment(startDate).format("YYYY-MM-DD"),
                        to: moment(endDate).format("YYYY-MM-DD")
                    });
                    setPortfolios(portfolioData);

                    const pricesData = await getPrices({
                        from: moment(startDate).format("YYYY-MM-DD"),
                        to: moment(endDate).format("YYYY-MM-DD")
                    });
                    setPrices(pricesData);
                } catch (e) {
                    setError("Error loading data");
                    throw e
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [startDate, endDate]);

    return {portfolios, prices, error, loading};
};