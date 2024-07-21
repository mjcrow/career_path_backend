
.\venv\Scripts\activate

python -m uvicorn app.main:app --reload


$env:NODE_OPTIONS = "--openssl-legacy-provider"