#ML Logic

import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

#Loading the product catalog catalog
def load_data(path="product_data.csv"):
    return pd.read_csv(path)

# Generate vector embeddings for a list of text fields - generic function
def embed_texts(texts):
    return model.encode(texts, convert_to_tensor=True)

# Recommendation logic
def recommend_products(user_query, category=None, budget_range=None, preferred_brands=None, top_k=5):
    df = load_data()

    #apply filters
    