import { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
    rank: number;
}

export default function ProductCard({ product, rank }: ProductCardProps) {
    const similarityPercentage = Math.round(product.similarity * 100);
    const scorePercentage = Math.round(product.score * 100);

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
            {/* Rank Badge */}
            <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                        #{rank}
                    </span>
                </div>
                
                {/* Placeholder Image */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-4xl">
                        📦
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Product Title */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {product.title}
                </h3>

                {/* Brand and Price */}
                <div className="flex justify-between items-center mb-3">
                    <span className="text-blue-400 font-medium">{product.brand}</span>
                    <span className="text-green-400 font-bold text-lg">
                        ${product.price.toLocaleString()}
                    </span>
                </div>

                {/* Features */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {product.features}
                </p>

                {/* Match Score */}
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">AI Match Score</span>
                        <span className="text-white font-medium">{scorePercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${scorePercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    View Details
                </button>

                {/* Debug Info (optional - can be removed) */}
                <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Similarity: {similarityPercentage}%</span>
                        <span>Score: {scorePercentage}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}