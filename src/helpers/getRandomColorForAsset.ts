export const getRandomColorForAsset = (asset: string) => {
    const colorMap: { [key: string]: string } = {
        APPL: '#FF6384',
        BTC: '#36A2EB',
        ETH: '#FFCE56',
        GOOGL: '#4BC0C0',
        USD: '#9966FF',
        EUR: '#44FF44',
        crypto: '#f41278',
        stock: '#2B7A1F',
        fiat: '#6197c3'
    };
    return colorMap[asset] || '#8884d8';
};