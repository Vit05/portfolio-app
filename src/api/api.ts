import axios from "axios";
import {Asset} from "../types/Asset";
import {Portfolio} from "../types/Portfolio";
import {Price} from "../types/Price";
import {PortfolioQueryParams} from "../types/PortfolioQueryParams";
import moment from "moment/moment";
import {PricesQueryParams} from "../types/PricesQueryParams";

const API_URL = "http://192.168.5.13:3000";

export const getAssets = async (): Promise<Asset[]> => {
    try {
        const response = await axios.get(`${API_URL}/assets`);
        return response.data;
    } catch (error) {
        console.error("Error fetching assets:", error);
        throw new Error("Could not fetch assets");
    }
};

export const getPrices = async ({assets, asOf, from, to}:PricesQueryParams): Promise<Price[]> => {
    try {
        const params: Record<string, string> = {};
        if (assets) params.assets = assets;
        if (asOf) params.asOf = asOf;
        if (from) params.from = from;
        if (to) params.to = to;
        const response = await axios.get(`${API_URL}/prices`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching prices:", error);
        throw new Error("Could not fetch prices");
    }
};

export const getPortfolio = async ({asOf, from, to}:PortfolioQueryParams): Promise<Portfolio[]> => {
    try {
        const params: Record<string, string> = {};
        if(!from && !to) params.asOf = asOf ? asOf : moment(new Date()).format("yyyy-MM-DD");
        if (from) params.from = from;
        if (to) params.to = to;

        const response = await axios.get(`${API_URL}/portfolios`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        throw new Error("Could not fetch portfolio");
    }
};
