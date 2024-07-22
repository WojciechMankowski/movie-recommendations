from google import fetchData
from datebase import add_value, book_exists
# https://developers.google.com/books/docs/v1/using?hl=pl


def main():
    data = fetchData()
    for item in data:
        print(item)
        if book_exists(item['title']):
            continue
        add_value('books', item)

if __name__ == '__main__':
    main()