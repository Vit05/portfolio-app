import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mock data for assets, prices, and portfolios
const assets = [
    { id: "1", name: "APPL", type: "stock" },
    { id: "2", name: "BTC", type: "crypto" },
    { id: "3", name: "USD", type: "fiat" },
    { id: "4", name: "ETH", type: "crypto" },
    { id: "5", name: "GOOGL", type: "stock" },
    { id: "6", name: "EUR", type: "fiat" }
];

const prices = [
    // APPL prices over different dates
    { id: "1", asset: "APPL", price: 290.32, asOf: "2024-09-01" },
    { id: "2", asset: "APPL", price: 295.20, asOf: "2024-09-15" },
    { id: "3", asset: "APPL", price: 300.00, asOf: "2024-10-01" },
    { id: "4", asset: "APPL", price: 400.00, asOf: "2024-10-15" },
    { id: "5", asset: "APPL", price: 500.00, asOf: "2024-10-20" },

    // BTC prices over different dates
    { id: "6", asset: "BTC", price: 40000, asOf: "2024-09-01" },
    { id: "7", asset: "BTC", price: 42000, asOf: "2024-09-15" },
    { id: "8", asset: "BTC", price: 38000, asOf: "2024-10-01" },
    { id: "9", asset: "BTC", price: 44000, asOf: "2024-10-15" },
    { id: "10", asset: "BTC", price: 37000, asOf: "2024-10-20" },

    // ETH prices over different dates
    { id: "11", asset: "ETH", price: 2800, asOf: "2024-09-01" },
    { id: "12", asset: "ETH", price: 2900, asOf: "2024-09-15" },
    { id: "13", asset: "ETH", price: 2700, asOf: "2024-10-01" },
    { id: "14", asset: "ETH", price: 2333, asOf: "2024-10-15" },
    { id: "15", asset: "ETH", price: 2300, asOf: "2024-10-20" },

    // GOOGL prices over different dates
    { id: "16", asset: "GOOGL", price: 2800, asOf: "2024-09-01" },
    { id: "17", asset: "GOOGL", price: 2850, asOf: "2024-09-15" },
    { id: "18", asset: "GOOGL", price: 2450, asOf: "2024-10-01" },
    { id: "19", asset: "GOOGL", price: 2600, asOf: "2024-10-15" },
    { id: "20", asset: "GOOGL", price: 4700, asOf: "2024-10-20" },

    // USD prices over different dates
    { id: "21", asset: "USD", price: 1, asOf: "2024-09-01" },
    { id: "22", asset: "USD", price: 1, asOf: "2024-09-15" },
    { id: "23", asset: "USD", price: 1, asOf: "2024-10-01" },
    { id: "24", asset: "USD", price: 1, asOf: "2024-10-15" },
    { id: "25", asset: "USD", price: 1, asOf: "2024-10-15" },

    // EUR prices over different dates
    { id: "26", asset: "EUR", price: 0.85, asOf: "2024-09-01" },
    { id: "27", asset: "EUR", price: 0.9, asOf: "2024-09-15" },
    { id: "28", asset: "EUR", price: 0.95, asOf: "2024-10-01" },
    { id: "29", asset: "EUR", price: 0.8, asOf: "2024-10-15" },
    { id: "30", asset: "EUR", price: 0.85, asOf: "2024-10-20" }
];
const portfolios = [
    // Portfolio as of 2024-09-01
    {
        id: "portfolio1",
        asOf: "2024-09-01",
        positions: [
            { id: 1, asset: "APPL", quantity: 2, asOf: "2024-09-01", price: 100 },
            { id: 2, asset: "BTC", quantity: 1, asOf: "2024-09-01", price: 150 },
            { id: 3, asset: "ETH", quantity: 1, asOf: "2024-09-01", price: 200 },
            { id: 4, asset: "USD", quantity: 390, asOf: "2024-09-01", price: 1 },
            { id: 5, asset: "EUR", quantity: 200, asOf: "2024-09-01", price: 0.85 }
        ]
    },

    // Portfolio as of 2024-09-15
    {
        id: "portfolio2",
        asOf: "2024-09-15",
        positions: [
            { id: 4, asset: "APPL", quantity: 8, asOf: "2024-09-15", price: 500.00 },
            { id: 5, asset: "GOOGL", quantity: 3, asOf: "2024-09-15", price: 4700 },
            { id: 6, asset: "BTC", quantity: 1, asOf: "2024-09-15", price: 42000 }
        ]
    },

    // Portfolio as of 2024-10-01
    {
        id: "portfolio3",
        asOf: "2024-10-01",
        positions: [
            { id: 7, asset: "APPL", quantity: 1, asOf: "2024-10-01", price: 300.00 },
            { id: 8, asset: "ETH", quantity: 1, asOf: "2024-10-01", price: 2700 },
            { id: 5, asset: "GOOGL", quantity: 7, asOf: "2024-09-15", price: 2450 },
            { id: 9, asset: "BTC", quantity: 1, asOf: "2024-10-01", price: 3000 }
        ]
    },

    // Portfolio as of 2024-10-15
    {
        id: "portfolio4",
        asOf: "2024-10-15",
        positions: [
            { id: 10, asset: "APPL", quantity: 30, asOf: "2024-10-15", price: 370.00 },
            { id: 11, asset: "GOOGL", quantity: 22, asOf: "2024-10-15", price: 2600 },
            { id: 12, asset: "ETH", quantity: 13, asOf: "2024-10-15", price: 2700 }
        ]
    },

    // Portfolio as of 2024-10-20
    {
        id: "portfolio5",
        asOf: "2024-10-20",
        positions: [
            { id: 13, asset: "APPL", quantity: 2, asOf: "2024-10-20", price: 500 },
            { id: 14, asset: "BTC", quantity: 1, asOf: "2024-10-20", price: 3700 },
            { id: 15, asset: "ETH", quantity: 1, asOf: "2024-10-20", price: 2300 }
        ]
    }
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error, _req: Request, res: Response) {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Unknown error";
}

// GET /assets - Fetch all assets
app.get("/assets", (_req: Request, res: Response) => {
    try {
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving assets", error: getErrorMessage(error) });
    }
});

// GET /prices - Fetch asset prices with optional filters for assets and date range
app.get("/prices", (req: Request, res: Response) => {
    const { assets: assetsQuery, asOf, from, to } = req.query;

    try {
        let filteredPrices = prices;

        if (assetsQuery) {
            const assetList = (assetsQuery as string).split(",");
            filteredPrices = filteredPrices.filter((p) => assetList.includes(p.asset));
        }

        if (asOf) {
            filteredPrices = filteredPrices.filter((p) => p.asOf === asOf);
        } else if (from && to) {
            filteredPrices = filteredPrices.filter((p) => p.asOf >= from && p.asOf <= to);
        }

        res.status(200).json(filteredPrices);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving prices", error: getErrorMessage(error) });
    }
});

// GET /portfolios - Fetch portfolio positions with optional date parameter
app.get("/portfolios", (req: Request, res: Response) => {
    const { asOf, from, to } = req.query;

    try {

        let filteredPortfolios = portfolios
        if (asOf) {
            filteredPortfolios = filteredPortfolios.filter((p) => p.asOf === asOf);
        } else if (from && to) {
            const fromDate = new Date(from as string);
            const toDate = new Date(to as string);

            filteredPortfolios =  filteredPortfolios.filter(item => {
                const itemDate = new Date(item.asOf);
                return itemDate >= fromDate && itemDate <= toDate;
            });
        }
        res.status(200).json(filteredPortfolios);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving portfolios", error: getErrorMessage(error) });
    }
});

// Error handling for undefined routes
app.use((_req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// General error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
