import os
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity

# -------------------------------
# Base directories
# -------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # PREFEREE/
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

# -------------------------------
# Load CSVs
# -------------------------------
movies = pd.read_csv(os.path.join(PROCESSED_DIR, "movies_processed.csv"))
ratings = pd.read_csv(os.path.join(PROCESSED_DIR, "ratings_processed.csv"))
popularity_df = pd.read_csv(os.path.join(PROCESSED_DIR, "top_100_popular.csv"))
item_cf_df = pd.read_csv(os.path.join(PROCESSED_DIR, "item_cf_top10.csv"))

# -------------------------------
# Load Sparse Matrices / Pickles
# -------------------------------
with open(os.path.join(PROCESSED_DIR, "user_item_matrix.pkl"), "rb") as f:
    user_item_matrix = pickle.load(f)

with open(os.path.join(PROCESSED_DIR, "user_id_map.pkl"), "rb") as f:
    user_id_map = pickle.load(f)

with open(os.path.join(PROCESSED_DIR, "movie_id_map.pkl"), "rb") as f:
    movie_id_map = pickle.load(f)

# -------------------------------
# Compute User Similarity
# -------------------------------
user_sim_matrix = cosine_similarity(user_item_matrix)
