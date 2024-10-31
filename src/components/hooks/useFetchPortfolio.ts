import {useEffect, useState} from "react";
import {Position} from "../../types/Position";
import {getPortfolio} from "../../api/api";
import moment from "moment";

export const useFetchPortfolio = (asOfDate: Date | undefined) => {
    const [positions, setPositions] = useState<Position[] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (asOfDate) {
            const fetchPortfolios = async () => {
                setLoading(true);
                try {
                    const portfolioData = await getPortfolio({ asOf: moment(asOfDate).format("YYYY-MM-DD") });
                    setPositions(portfolioData[0]?.positions);
                } catch (e) {
                    setError("Error loading portfolio");
                    throw e
                } finally {
                    setLoading(false);
                }
            };
            fetchPortfolios();
        }
    }, [asOfDate]);

    return { positions, error, loading };
};