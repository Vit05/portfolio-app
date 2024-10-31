export interface Asset {
    id: string;
    name: string;
    type: "stock" | "crypto" | "cash";
}

export interface Price {
    id: string;
    asset: string;
    asOf: string;
    price: number;
}

export interface Portfolio {
    id: string;
    asOf: string;
    positions: Position[];
}

export interface Position {
    id: number;
    asset: string;
    quantity: number;
    price: number;
}