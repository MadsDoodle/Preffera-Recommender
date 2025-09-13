from app.cf_engines import predict_ratings_user_cf, predict_ratings_item_cf
from app.lightfm_engine import recommend_lightfm, model as lfm_model, dataset as lfm_dataset, item_embeddings
from app.utils import user_item_matrix, user_sim_matrix, movies
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

# Load popularity_df if needed
popularity_df = pd.read_csv("/Volumes/Crucial X6/Preferee/data/processed/top_100_popular.csv")

def recommend_movies_hybrid(user_idx, top_n=10, k=5, min_rated_user=5, min_rated_item=2):
    user_rated_count = user_item_matrix[user_idx].getnnz()
    
    if user_rated_count >= min_rated_user:
        return predict_ratings_user_cf(user_idx, user_item_matrix, user_sim_matrix, movies, top_n, k)
    elif user_rated_count >= min_rated_item:
        item_sim_matrix = cosine_similarity(user_item_matrix.T)
        return predict_ratings_item_cf(user_idx, user_item_matrix, item_sim_matrix, movies, top_n, k)
    else:
        return recommend_lightfm(user_idx, lfm_model, lfm_dataset, movies, top_n)

def recommend_similar_movies(movie_name, movies_df, item_embeddings, top_n=5):
    movie_row = movies_df[movies_df["title"].str.lower() == movie_name.lower()]
    if movie_row.empty:
        return None
    movie_idx = movie_row.iloc[0]["movie_idx"]
    sim_scores = cosine_similarity([item_embeddings[movie_idx]], item_embeddings)[0]
    similar_idx = np.argsort(-sim_scores)
    similar_idx = similar_idx[similar_idx != movie_idx][:top_n]
    return movies_df[movies_df["movie_idx"].isin(similar_idx)][["movie_idx", "title"]]
