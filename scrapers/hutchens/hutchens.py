import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime

# MongoDB connection
client = MongoClient("mongodb+srv://caleblwright:ekd3TML52UV1SvQ6@portfolio.673qsh4.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio")
db = client["foreclosures"]
collection = db["HutchensForeclosureData"]

# URL of the sales list
url = "https://sales.hutchenslawfirm.com/NCfcSalesList.aspx"

# Get the page HTML
response = requests.get(url)
soup = BeautifulSoup(response.text, "lxml")

# Find the sales table by ID
table = soup.find("table", id="SalesListGrid_ctl01")
rows = table.find("tbody").find_all("tr")

scraped_data = []

for row in rows:
    cols = row.find_all("td")
    if len(cols) < 8:
        continue

    entry = {
        "file_number": cols[0].text.strip(),
        "case_number": cols[1].text.strip(),
        "county": cols[2].text.strip(),
        "sale_date": cols[3].text.strip(),
        "property_address": cols[4].text.strip(),
        "city_state_zip": cols[5].text.strip(),
        "trustee_file": cols[6].text.strip(),
        "opening_bid": cols[7].text.strip(),
        "scraped_at": datetime.now(tz = None)
    }
    scraped_data.append(entry)

# Optional: clear out old data
collection.delete_many({})

# Insert new records
if scraped_data:
    collection.insert_many(scraped_data)
    print(f"Inserted {len(scraped_data)} records into MongoDB.")
else:
    print("No records found.")
