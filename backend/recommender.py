import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables (for OPENAI_API_KEY)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Load SentenceTransformer model for traditional recommendation
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load product catalog
def load_data(path="product_data.csv"):
    return pd.read_csv(path)


# Convert a list of texts into embeddings
def embed_texts(texts):
    return model.encode(texts, convert_to_tensor=True)


# 🔷 Classic recommendation using embeddings
def recommend_products(user_query, category=None, budget_range=None, preferred_brands=None, top_k=5):
    df = load_data()

    # Remove rows with missing essential fields
    df = df.dropna(subset=['Product Name', 'Sale Price', 'Brand', 'Description'])
    df = df.rename(columns={
        'Product Name': 'title',
        'Sale Price': 'price',
        'Brand': 'brand',
        'Description': 'features',
        'Category': 'category'
    })

    # Filter by category if specified
    if category:
        df = df[df['category'].str.lower().str.contains(category.lower(), na=False)]

    # Filter by budget if specified
    if budget_range:
        df = df[(df['price'] >= budget_range[0]) & (df['price'] <= budget_range[1])]

    # Stop if no matching products found
    if df.empty:
        return []

    # Prepare embeddings
    product_texts = (df['title'] + ' ' + df['features']).tolist()
    product_embeddings = embed_texts(product_texts)
    user_embedding = embed_texts([user_query])[0]

    # Cosine similarity
    similarities = util.cos_sim(user_embedding, product_embeddings)[0].cpu().numpy()
    df['similarity'] = similarities

    # Optional brand boost
    if preferred_brands:
        df['brand_boost'] = df['brand'].apply(
            lambda b: 0.05 if str(b).lower() in [p.lower() for p in preferred_brands] else 0.0
        )
    else:
        df['brand_boost'] = 0.0

    df['score'] = df['similarity'] + df['brand_boost']

    # Return top K
    top_products = df.sort_values(by='score', ascending=False).head(top_k)
    return top_products[['title', 'price', 'brand', 'features', 'similarity', 'score']].to_dict(orient='records')


# 🔷 GPT-based recommendation
def recommend_products_gpt(user_query, top_k=5):
    df = load_data()

    df = df.dropna(subset=['Product Name', 'Sale Price', 'Brand', 'Description'])
    df = df.rename(columns={
        'Product Name': 'title',
        'Sale Price': 'price',
        'Brand': 'brand',
        'Description': 'features',
        'Category': 'category'
    })

    # Limit products to avoid token overflow
    products = df[['title', 'price', 'brand', 'features']].to_dict(orient='records')[:50]

    prompt = f"""
You are a smart product recommender system. Based on the user's query, return the top {top_k} most relevant products.

User query:
"{user_query}"

Available products:
{products}

Return a list of {top_k} product suggestions as JSON objects.
Each object should contain: title, price, brand, features.
Do not explain anything — just return JSON list.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you're using that
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1000
        )
        content = response.choices[0].message.content
        return eval(content) if isinstance(content, str) else content
    except Exception as e:
        print("OpenAI error:", e)
        return []

