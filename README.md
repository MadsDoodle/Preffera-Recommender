# Preferra 

Preferra is a full-stack recommender system built to provide personalized and content-based recommendations.
It supports two main modes of recommendation:

- User → Movie (personalized)
- Movie → Movie (similar items)

Current domain: Movies (MovieLens 100k). Designed to extend to Books and Learning.

## Features

- Hybrid strategy: UserCF → ItemCF → LightFM fallback
- Fast inference via preprocessed artifacts in `data/processed/`
- Clean API (FastAPI) with CORS enabled
- Modern React + TypeScript frontend (Vite + shadcn/ui)
- Reproducible notebooks documenting the pipeline

## Tech Stack

- Backend: Python 3.11, FastAPI, Uvicorn, NumPy, Pandas, scikit‑learn, LightFM
- Frontend: React 18, TypeScript, Vite, Tailwind, shadcn/ui, React Router, TanStack Query
- Data: MovieLens 100k (`data/ml-100k/`), processed artifacts (`data/processed/`)

## Repository Structure

- `app/` — FastAPI and engines
  - `main.py` (API routes)
  - `recommender.py` (hybrid logic)
  - `cf_engines.py` (UserCF, ItemCF)
  - `lightfm_engine.py` (LightFM model, item embeddings)
  - `utils.py` (load CSV/Pickle artifacts, similarity)
- `frontend/` — React app (Vite, TS, shadcn/ui)
  - `src/App.tsx`, `src/pages/` (Movies, Books, Learning, Settings)
  - `src/components/` (UI), `src/hooks/`, `src/lib/`
  - `package.json`, `bun.lockb`, `vite.config.ts`
- `data/`
  - `ml-100k/` (raw)
  - `processed/` (artifacts: `movies_processed.csv`, `ratings_processed.csv`, `item_cf_top10.csv`, maps & matrices)
- `notebooks/` — numbered pipeline (01…09)
- `requirements.txt`, `.venv/`, `unzip.py`

## Workflow

```mermaid
flowchart TD
  A[User] --> B["Frontend (React/TS)"]
  B --> C["API (FastAPI)"]
  C -->|User→Movie| D1[UserCF]
  C -->|User→Movie (few ratings)| D2[ItemCF]
  C -->|Cold-start| D3[LightFM]

  subgraph Data
    E1[(data/ml-100k)]
    E2[(data/processed)]
  end

  D1 <-- read --> E2
  D2 <-- read --> E2
  D3 <-- read --> E2
  F["Notebooks 01–09"] --> E2
  F <-- read --> E1

  C --> B --> A

```

Decision logic (`app/recommender.py`):

- If user rated ≥ `min_rated_user` (default 5): UserCF
- Else if user rated ≥ `min_rated_item` (default 2): ItemCF
- Else: LightFM

## API (app/main.py)

- GET `/recommend/user/{user_id}?top_n=10`
  - Returns: list of `{ movie_idx, title }`
- GET `/recommend/movie/?movie_name=...&top_n=5`
  - Returns: list of `{ movie_idx, title }` or `{ error }`

CORS: allows `http://localhost:8081` (adjust for your frontend dev URL).

## Backend: Run

- Create venv and install

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

- Ensure artifacts exist in `data/processed/`

- Start API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend: Run

Using npm (package.json scripts):

```bash
cd frontend
npm install
npm run dev
```

(Or Bun if preferred: `bun install && bun dev`)

## Notebooks (Pipeline)

- `01_data_loader.ipynb` — load + EDA
- `02_sparse_matrix.ipynb` — sparse UI matrix, indexing
- `03_baseline_popularity.ipynb`
- `04_baseline_user_cf.ipynb`
- `05_baseline_item_cf.ipynb`
- `06_evaluation_comparision.ipynb`
- `07_inference_engine.ipynb`
- `08_lightfm_engine.ipynb`
- `09_hybrid_final_inference.ipynb`

Outputs saved to `data/processed/`:

- CSV: `movies_processed.csv`, `ratings_processed.csv`, `item_cf_top10.csv`, `top_100_popular.csv`
- Pickle: `user_item_matrix.pkl`, `user_id_map.pkl`, `movie_id_map.pkl`

## Frontend Routes (`src/App.tsx`)

- `/` — Index
- `/movies` — Movies recommender UI
- `/books` — Books (placeholder for future)
- `/learning` — Learning (placeholder for future)
- `/settings` — Settings

## Troubleshooting

- CORS: update `allow_origins` in `app/main.py` to match frontend URL (e.g., `http://localhost:5173`).
- Missing artifacts: re-run notebooks or copy required files to `data/processed/`.
- Import errors: run with `uvicorn app.main:app` from repo root; ensure `.venv` active.

## Roadmap

- Books recommender (authors/genres content features)
- Learning recommender (course metadata + engagement signals)
- API: search endpoint and richer schemas (genres/year/score)
- Caching and pagination for large responses

## License

MIT (update if different)
