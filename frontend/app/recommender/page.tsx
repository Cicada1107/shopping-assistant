'use client'

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/product";


export default function Recommender(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //search handler
    //hit the api endpoint to send to fast api and then get the recommended products in response
    const handleSearch = async (searchData: any) => {
        setLoading(true);
        setError(null);

        try{
            const response = await fetch('http://127.0.0.1:8000/recommend_products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData),
            });


            if(!response.ok){
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            setProducts(data);
        }catch(err){
            setError(err instanceof Error ? err.message : 'An error occured');
        }finally{
            setLoading(false);
        }
    };
    
    return  (

        //search bar containing field for: 
        //query, category(dropdown - enum?), budget(slider - start & end), brands()
        <div className="min-h-screen bg-gray-900 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        AI-Powered Product Recommendations
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Find the perfect products tailored to your needs
                    </p>
                </div>
                {/* Search Bar */}
                <SearchForm onSearch={handleSearch} loading={loading} />
                
                {error && (
                    <div className="mt-8 p-4 bg-red-900 border border-red-700 rounded-lg">
                        <p className="text-red-200">{error}</p>
                    </div>
                )}
                

                {/* Product list */}
                <ProductGrid products={products} loading={loading} />
            </div>
        </div>
    );
}