import boto3
import requests
from bs4 import BeautifulSoup
import pandas as pd

# Config
BUCKET_NAME = 'scraperprojectbucket'
BUCKET_PREFIX = 'BrockandScottNC/'
FILENAME = 'foreclosure_data.xlsx'
LOCAL_PATH = f'/tmp/{FILENAME}'

def extract_data_from_page(url):
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }
    response = requests.get(url, headers=headers)
    data_list = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        records = soup.find_all("div", class_="record", title="row")

        for record in records:
            data = {}
            for field in record.find_all("div", class_="forecol"):
                try:
                    label, value = field.find_all("p")
                    key = label.get_text(strip=True).replace(":", "")
                    val = value.get_text(strip=True)
                    data[key] = val
                except ValueError:
                    continue
            data_list.append(data)
    return data_list

def scrape_all_pages():
    base_url = "https://www.brockandscott.com/foreclosure-sales/?_sft_foreclosure_state=nc"
    page_number = 1
    all_data = []

    while True:
        url = f"{base_url}&sf_paged={page_number}"
        page_data = extract_data_from_page(url)
        if not page_data:
            break
        all_data.extend(page_data)
        page_number += 1

    return all_data

def save_to_excel(data, path):
    df = pd.DataFrame(data)
    df.fillna("N/A", inplace=True)
    df.to_excel(path, index=False)

def upload_to_s3(local_path, bucket, key):
    s3 = boto3.client('s3')
    s3.upload_file(local_path, bucket, key)

def generate_presigned_url(bucket, key, expiration=3600):
    s3 = boto3.client('s3')
    return s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket, 'Key': key},
        ExpiresIn=expiration
    )

def lambda_handler(event, context):
    try:
        data = scrape_all_pages()
        if not data:
            return {"statusCode": 500, "body": "No data scraped."}

        save_to_excel(data, LOCAL_PATH)
        s3_key = f"{BUCKET_PREFIX}{FILENAME}"
        upload_to_s3(LOCAL_PATH, BUCKET_NAME, s3_key)
        url = generate_presigned_url(BUCKET_NAME, s3_key)

        return {
            "statusCode": 200,
            "body": url
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": str(e)
        }
