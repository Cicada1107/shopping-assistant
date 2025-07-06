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



    #apply filters first - filter out only those prducts which mathc user input (normal vala)

    #pehle Clean and prepare relelvant columns - 
    #select sirf vo vale rows jisme ye chaaro columns mein data non null hai
    df = df.dropna(subset=['Product Name', 'Sale Price', 'Brand', 'Description'])
    #Rename these columns to math what we defined the input to the API call in readme.md
    df = df.rename(columns={
        'Product Name': 'title',
        'Sale Price': 'price',
        'Brand': 'brand',
        'Description': 'features',
        'Category': 'category'
    })

    #Now apply filters:
    if category:
        df = df[df['category'].str.lower().str.contains(category.lower(), na=False)]
    if budget_range:
        df = df[(df['price'] >= budget_range[0]) & (df['price'] <= budget_range[1])]

    if df.empty:
        return []

    

    # Prepare text to embed: title + features - list and then convert to vector
    product_texts = (df['title'] + ' ' + df['features']).tolist()
    product_embeddings = embed_texts(product_texts)

    #Now convert the user query to vector (vector mein convert karna is embedding btw)
    user_embedding = embed_texts([user_query])[0]



    #Now get the dot product(cosine) to get the similarity & then add the similarity as a column - thus placing the similarity score(dot prod value) of each product next to them. We can use this to sort and stuff later. 
    similarities = util.cos_sim(user_embedding, product_embeddings)[0].cpu().numpy()
    df['similarity'] = similarities


    # Boost for brand preference and rating (if applicable) - basically bass add kardo 0.05 to the simiarity score tfor each product that has a brand which belongs to the preferred brand list
    if preferred_brands:
        df['brand_boost'] = df['brand'].apply(lambda b: 0.05 if str(b).lower() in [p.lower() for p in preferred_brands] else 0.0)
    else:
        df['brand_boost'] = 0.0
    df['score'] = df['similarity'] + df['brand_boost']



    #Return top k
    top_products = df.sort_values(by='score', ascending=False).head(top_k)
    return top_products[['title', 'price', 'brand', 'features', 'similarity', 'score']].to_dict(orient='records')