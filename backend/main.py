#Fast API entry point - the api backend endpoint

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from recommender import recommend_products

app = FastAPI()

#Note that pydantic is the python request and response handler lib

#input schema
class RecommendationRequest(BaseModel):
    query: str
    category: Optional[str] = None
    budget: Optional[List[float]] = None  # [min, max]
    brands: Optional[List[str]] = None
    top_k: Optional[int] = 5



# Output schema
class ProductOut(BaseModel):
    title: str
    price: float
    brand: str
    features: str
    similarity: float
    score: float


@app.get("/")
def root():
    return {"message": "Smart Product Recommender is running!"}


@app.post("/recommend_products", response_model=List[ProductOut])
def recommend(req: RecommendationRequest):
    results = recommend_products(
        user_query=req.query,
        category=req.category,
        budget_range=req.budget,
        preferred_brands=req.brands,
        top_k=req.top_k
    )
    return results