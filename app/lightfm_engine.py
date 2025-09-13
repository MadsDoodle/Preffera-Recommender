from lightfm import LightFM
from lightfm.data import Dataset as LightFMDataset
import numpy as np
import pandas as pd
from app.utils import ratings

# Train LightFM model once
dataset = LightFMDataset()
dataset.fit(users=ratings['user_idx'].unique(), items=ratings['movie_idx'].unique())

interactions, _ = dataset.build_interactions(
    [(row.user_idx, row.movie_idx, row.rating) for row in ratings.itertuples()]
)

model = LightFM(loss='warp', random_state=42)
model.fit(interactions, epochs=30, num_threads=4)

# Extract item embeddings
item_embeddings = model.get_item_representations()[1]

def recommend_lightfm(user_idx, model, dataset, movies_df, top_n=10):
    n_items = dataset.interactions_shape()[1]
    scores = model.predict(user_idx, np.arange(n_items))
    top_items = np.argsort(-scores)[:top_n]
    return movies_df[movies_df["movie_idx"].isin(top_items)][["movie_idx", "title"]]
