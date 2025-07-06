import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
    //loader lagane ka tarika thora kezual hai
    if (loading) {
        return (
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                            <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="mt-8 text-center py-12">
                <div className="text-gray-400 text-lg">
                    No products found. Try adjusting your search criteria.
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">
                Recommended Products ({products.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} rank={index + 1} />
                ))}
            </div>
        </div>
    );
}