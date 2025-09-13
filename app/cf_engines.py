import numpy as np
import pandas as pd

def predict_ratings_user_cf(user_idx, user_item_matrix, user_sim_matrix, movies_df, top_n=10, k=5):
    """
    Predict top-N movies for a given user using User-Based Collaborative Filtering.
    """
    sim_scores = user_sim_matrix[user_idx]
    top_k_users = np.argsort(sim_scores)[-k-1:-1][::-1]  # exclude self
    top_ratings = user_item_matrix[top_k_users].toarray()
    top_sim = sim_scores[top_k_users].reshape(-1,1)
    pred_ratings = (top_ratings * top_sim).sum(axis=0) / (top_sim.sum() + 1e-8)
    user_rated = user_item_matrix[user_idx].toarray().flatten() > 0
    pred_ratings[user_rated] = 0
    top_movie_idx = np.argsort(pred_ratings)[-top_n:][::-1]
    recommendations = movies_df[movies_df["movie_idx"].isin(top_movie_idx)]
    return recommendations[["movie_idx", "title"]].head(top_n)


def predict_ratings_item_cf(user_idx, user_item_matrix, item_sim_matrix, movies_df, top_n=10, k=5):
    """
    Predict top-N movies for a user using Item-Based Collaborative Filtering.
    """
    user_ratings = user_item_matrix[user_idx].toarray().flatten()
    pred_ratings = np.zeros(user_item_matrix.shape[1])

    for movie_idx in range(user_item_matrix.shape[1]):
        if user_ratings[movie_idx] > 0:
            continue
        sim_scores = item_sim_matrix[movie_idx]
        rated_indices = np.where(user_ratings > 0)[0]
        top_k_items = rated_indices[np.argsort(sim_scores[rated_indices])[-k:]]
        if len(top_k_items) > 0:
            weights = sim_scores[top_k_items]
            ratings = user_ratings[top_k_items]
            pred_ratings[movie_idx] = np.dot(weights, ratings) / (weights.sum() + 1e-8)

    top_movie_idx = np.argsort(pred_ratings)[-top_n:][::-1]
    recommendations = movies_df[movies_df["movie_idx"].isin(top_movie_idx)]
    return recommendations[["movie_idx", "title"]].head(top_n)
