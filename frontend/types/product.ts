export interface Product {
    title: string;
    price: number;
    brand: string;
    features: string;
    similarity: number;
    score: number;
}

export interface SearchFormData {
    query: string;
    category?: string;
    budget?: [number, number];
    brands?: string[];
    top_k?: number;
}