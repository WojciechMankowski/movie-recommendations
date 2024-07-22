import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../components/book";
import { BooksAPI } from "../types/BooksAPI";

const getData = async (): Promise<BooksAPI> => {
  const res = await axios.get("http://localhost:3000/api/books");
  if (res.status != 200) {
    console.error(res);
    throw res;
  }
  return res.data;
};

const BookList = async () => {
  const response = await getData();
  const data = response.data;

  return (
    <main className="flex flex-wrap flex-row justify-center">
      <h2 className="text-3xl font-bold text-gray-900 p-5">Książki</h2>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 px-10">
        {data.map((book) => (
          <Book
            id={book.id}
            title={book.title}
            authors={book.authors}
            image_links={book.image_links}
            description={book.description}
            page_count={book.page_count}
            print_type={book.print_type}
            categories={book.categories}
            maturity_rating={book.maturity_rating}
            contains_epub_bubbles={book.contains_epub_bubbles}
            language={book.language}
            canonical_volume_link={book.canonical_volume_link}
            published_date={book.published_date}
          />
        ))}{" "}
      </div>
    </main>
  );
};

export default BookList;
