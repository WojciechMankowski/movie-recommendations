import requests

def showInfoBook(items):
    all_books = []
    for book in items:
        volume_info = book.get('volumeInfo', {})
        book_info = {
            'title': volume_info.get('title', ''),
            'authors': ', '.join(volume_info.get('authors', [])),
            'published_date': volume_info.get('publishedDate', ''),
            'description': volume_info.get('description', ''),
            'page_count': volume_info.get('pageCount', 0),
            'print_type': volume_info.get('printType', ''),
            'categories': ', '.join(volume_info.get('categories', [])),
            'maturity_rating': volume_info.get('maturityRating', ''),
            'contains_epub_bubbles': volume_info.get('panelizationSummary', {}).get('containsEpubBubbles', False),
            'language': volume_info.get('language', ''),
            'canonical_volume_link': volume_info.get('canonicalVolumeLink', ''),
            'image_links': volume_info.get('imageLinks', {}).get('smallThumbnail', '')
        }
        all_books.append(book_info)
    return all_books

def get_max_items():
    query = '*'
    index = 0
    params = {"q": query, 'maxResults': 40, 'startIndex': index, 'langRestrict': 'pl'}
    url = r'https://www.googleapis.com/books/v1/volumes'
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    totalItems = data.get('totalItems', 0)
    return totalItems

def fetchData():
    query = '*'
    index = 0
    all_books = []
    totatl_items = get_max_items()
    url = r'https://www.googleapis.com/books/v1/volumes'
    params = {"q": query, 'maxResults': 40, 'startIndex': index, 'langRestrict': 'pl'}
    print(totatl_items)
    sum_items = 0
    while sum_items != totatl_items:
        response = requests.get(url, params=params)
        data = response.json()
        items = data.get('items', [])
        all_books.extend(item for item in showInfoBook(items))
        sum_items += len(items)
        index += 1
        # print(f"Index: {index} suma: {sum_items}")
        if sum_items > totatl_items:
            break
    return all_books



if __name__ == '__main__':
    fetchData()