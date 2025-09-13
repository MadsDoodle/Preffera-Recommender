from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Import your modularized functions
from app.recommender import recommend_movies_hybrid, recommend_similar_movies
from app.lightfm_engine import item_embeddings
from app.utils import movies

app = FastAPI(title="Prefora Recommender API")

# Allow CORS so frontend can call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # In prod, set your frontend URL
    allow_methods=["*"],
    allow_headers=["*"]
)

# ----------------------
# User-to-Movie Recommendation
# ----------------------
@app.get("/recommend/user/{user_id}")
def user_recommendations(user_id: int, top_n: int = 10):
    """
    Returns top-N recommended movies for a given user.
    """
    try:
        recs = recommend_movies_hybrid(user_id, top_n=top_n)
        return recs.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}

# ----------------------
# Movie-to-Movie Recommendation
# ----------------------
@app.get("/recommend/movie/")
def movie_recommendations(movie_name: str = Query(...), top_n: int = 5):
    """
    Returns top-N movies similar to the given movie name.
    """
    try:
        recs = recommend_similar_movies(movie_name, movies, item_embeddings, top_n=top_n)
        if recs is None or recs.empty:
            return {"error": "Movie not found!"}
        return recs.to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
