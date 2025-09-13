import zipfile
import os

data_dir = "data"
zip_path = os.path.join(data_dir, "ml-100k.zip")
extract_path = os.path.join(data_dir, "ml-100k")

# Unzip only if not already extracted
if not os.path.exists(extract_path):
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(data_dir)

print("Dataset ready at:", extract_path)
