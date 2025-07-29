from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from recommender import recommend_products, recommend_products_gpt

app = FastAPI()

# Allow frontend (e.g. Next.js at localhost:3000)
origins = [
    "http://localhost:3000",
    "*"  # Allow all during development — remove in production!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class RecommendationRequest(BaseModel):
    query: str
    category: Optional[str] = None
    budget: Optional[List[float]] = None  # [min, max]
    brands: Optional[List[str]] = None
    top_k: Optional[int] = 5
    use_gpt: Optional[bool] = False  # 🧠 Use OpenAI GPT if true


# Output schema
class ProductOut(BaseModel):
    title: str
    price: float
    brand: str
    features: str
    similarity: Optional[float] = None  # Will be None for GPT results
    score: Optional[float] = None       # Will be None for GPT results


@app.get("/")
def root():
    return {"message": "Smart Product Recommender is running!"}


@app.post("/recommend_products", response_model=List[ProductOut])
def recommend(req: RecommendationRequest):
    if req.use_gpt:
        # Use GPT-based recommendations
        return recommend_products_gpt(
            user_query=req.query,
            top_k=req.top_k
        )
    
    # Use classic sentence-transformer + filters
    return recommend_products(
        user_query=req.query,
        category=req.category,
        budget_range=req.budget,
        preferred_brands=req.brands,
        top_k=req.top_k
    )
