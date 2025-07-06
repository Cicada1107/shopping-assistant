'use client'

import { useState } from "react";
import { SearchFormData } from "@/types/product";

interface SearchFormProps {
    onSearch: (data: SearchFormData) => void;
    loading: boolean;
}

const categories = [
    "Electronics",
    "Laptop",
    "Smartphone",
    "Headphones",
    "Camera",
    "Gaming",
    "Home & Garden",
    "Fashion",
    "Books",
    "Sports"
];

const popularBrands = [
    "Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "Nike", "Adidas", 
    "Philips", "LG", "Canon", "Nikon", "Microsoft", "Google", "Amazon"
];

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [budget, setBudget] = useState<[number, number]>([0, 10000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [topK, setTopK] = useState(5);

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const searchData: SearchFormData = {
            query,
            category: category || undefined,
            budget: budget[0] > 0 || budget[1] < 10000 ? budget : undefined,
            brands: selectedBrands.length > 0 ? selectedBrands : undefined,
            top_k: topK
        };

        onSearch(searchData);
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Query Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        What are you looking for?
                    </label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., lightweight laptop with good battery life"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Category (Optional)
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Number of Results */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Number of Results
                        </label>
                        <select
                            value={topK}
                            onChange={(e) => setTopK(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value={3}>3 Products</option>
                            <option value={5}>5 Products</option>
                            <option value={10}>10 Products</option>
                            <option value={15}>15 Products</option>
                        </select>
                    </div>
                </div>

                {/* Budget Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range: ${budget[0]} - ${budget[1]}
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={budget[0]}
                            onChange={(e) => setBudget([Number(e.target.value), budget[1]])}
                            className="flex-1 accent-blue-500"
                        />
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={budget[1]}
                            onChange={(e) => setBudget([budget[0], Number(e.target.value)])}
                            className="flex-1 accent-blue-500"
                        />
                    </div>
                </div>

                {/* Brand Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Brands (Optional)
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                        {popularBrands.map(brand => (
                            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandToggle(brand)}
                                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                                />
                                <span className="text-sm text-gray-300">{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            <span>Searching...</span>
                        </>
                    ) : (
                        <span>Get AI Recommendations</span>
                    )}
                </button>
            </form>
        </div>
    );
}