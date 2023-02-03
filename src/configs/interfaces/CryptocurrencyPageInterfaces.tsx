export interface ICoinListData {
    id: string;
    symbol: string;
    name: string;
    market_cap_rank: number;
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    price_change_percentage_30d_in_currency: number;
    sparkline_in_7d: ICoinHistory7d;
}

interface ICoinHistory7d {
    price: number[];
}

export interface IResultObject {
    x: number;
    y: number[];
}

export interface ICategoriesList {
    category_id: string;
    name: string;
}

export interface ICategoryState {
    category_id: string;
    category_name: string;
}
