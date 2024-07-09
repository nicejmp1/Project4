import requests
import xmltodict
import json
import os

# URL 템플릿
url_template = "https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA60/HRDPOA60_1.jsp?returnType=XML&authKey=w5PONwCLXEnBrSqIzeCxUfyC4odk4xPB&pageNum={page_num}&pageSize=100&srchTraStDt=20240704&srchTraEndDt=20241004&outType=1&sort=ASC&sortCol=TRNG_BGDE&crseTracseSe=C0061&srchTraArea1=00"

# JSON 파일을 저장할 디렉토리
output_dir = "output_jsons"
os.makedirs(output_dir, exist_ok=True)

# 각 페이지에 대해 데이터를 가져와 JSON 파일로 저장
for page_num in range(1, 101):
    url = url_template.format(page_num=page_num)
    response = requests.get(url)

    if response.status_code == 200:
        data_dict = xmltodict.parse(response.text)
        json_data = json.dumps(data_dict, ensure_ascii=False, indent=4)

        # 파일 이름 지정
        json_file_name = os.path.join(output_dir, f"data_page_{page_num}.json")

        with open(json_file_name, "w", encoding="utf-8") as json_file:
            json_file.write(json_data)

        print(f"{json_file_name} 파일이 성공적으로 저장되었습니다.")
    else:
        print(f"HTTP 요청 실패: 상태 코드 {response.status_code}, URL: {url}")
