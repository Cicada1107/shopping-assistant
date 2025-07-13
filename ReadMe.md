# 🧠 ML-Powered Product Recommendation System

This project delivers personalized product recommendations based on user preferences, powered by natural language understanding and semantic similarity using Sentence Transformers.

## Flow/Core working:
- Frontend (React) ⟶ Backend API (FastAPI) ⟶ ML Layer (SentenceTransformer) ⟶ Product Data (CSV/JSON)
- In backend: Cosine Similarity Matching & Scoring

---

## 🚀 Step-by-Step Workflow

---

### PHASE 1: User Interaction (Frontend)

Users interact with a simple, intuitive form:

- **Product Category**: dropdown selector
- **Query**: free-text input (e.g., "i7 processor, lightweight, good battery")
- **Budget Range**: slider input (e.g., ₹50,000 – ₹75,000)
- **Preferred Brands**: checkbox list (e.g., Dell, HP, Lenovo)

 **Example Request Payload**
```json
{
  "category": "laptop",
  "query": "i7 processor, lightweight, good battery",
  "budget": [50000, 75000],
  "brands": ["Dell", "HP"]
}
```

### PHASE 2: Request Handling and Pre-logic filtering (Backend) - FastAPI

Receive user inputs in FastAPI.
Filter product catalog (CSV or database) by:
    - category match
    - price within budget
    - optionally: in-stock flag
Kaggle acquired csv data file type mapping with our example:
    - Product Name → title
    - Brand → brand
    - Sale Price → price
    - Description → features
    - Category → category

### PHASE 3: ML-Powered Recommendation Logic

- **Preprocess all filtered product entries:**
  - Combine product title + features/description into a text string.

- **Use SentenceTransformer (e.g. all-MiniLM-L6-v2):**
  - Encode user query to vector (1x384)
  - Encode each product’s description to vector (Nx384)

- **Use cosine similarity to compare:**
  - `similarity = cos(user_vector, product_vector)`
  - Output a similarity score (0–1) for each product

- **(Optional) Add bonus weights:**
  - +0.05 if brand matches preferred list
  - +0.03 if product rating ≥ 4.0

- **Sort all results by total similarity score (descending)**

---

### PHASE 4: Response (API → Frontend)

- Format top N products with:
  - Title, image URL, price, brand, rating, short description
  - Matching reasons (e.g. "Strong semantic match + preferred brand")

- Return JSON response to frontend.

---

### PHASE 5: UI Output (Frontend)

- Render a responsive grid or card layout:
  - Show top N recommendations
  - For each card: product image, title, price, badge (why we picked this)

- Optional:
  - Toggle to show match % or explanations
  - Include a “Refine Your Search” panel to update inputs and re-run.
---

## Usage Instructions

  -- git clone (kar lena jaise bhi)
  -- from the root directory, go to the backend directory
  -- there, set up virual env using python's built "venv" library (use google/chatgpt/[`Python Venv Docs`](https://docs.python.org/3/library/venv.html)
  -- install all dependencies:  (you should have pip installed along with python and all)
  ```bash
  pip install -r requirements.txt
  ```
  -- now go to the frontend directory and install the dependencies there using:
  ```bash
  npm install
  ```
  -- Run the backend and the frontend servers (they will by default run on two different ports: backend on 8000 & frontend on 3000)
  -- do this by opening two seperate terminal instances, and cd to frontend and backend respectively.
  -- for backend, run: 
  ```bash
  uvicorn main:app --reload
  ```
  -- for frontend:
  ```bash
  npm run dev
  ```
  -- Now go to localhost 8000 and do whatever you want
