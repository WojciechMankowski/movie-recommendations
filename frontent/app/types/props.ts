export type MovieProps = {
  id: number;
  title: string;
  release_date: string | null;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  genres: string;
};

export type BookProps = {
  id: number;
  title: string;
  authors: string;
  published_date: string;
  description: string;
  page_count: number;
  print_type: string;
  categories: string;
  maturity_rating: string;
  contains_epub_bubbles: boolean;
  language: string;
  canonical_volume_link: string;
  image_links: string;
};
