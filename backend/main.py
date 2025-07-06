#Fast API entry point - the api backend endpoint
#using uvicorn for running the fastAPI server

#When you install FastAPI, it comes with a production server, Uvicorn, and you can start it with the fastapi run command. But you can also install an ASGI server  - source: fastapi docs 

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


'''
To run: uvicorn main:app --reload
then visit: http://localhost:8000/docs
There you'll find Swagger UI — test the /recommend_products endpoint interactively.

sample request payload:
{
"query": "lightweight energy-saving smart bulb",
"category": "Electronics",
"budget": [10, 50],
"brands": ["AduroSmart ERIA", "Philips"],
"top_k": 5
}
'''