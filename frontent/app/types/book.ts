interface Book  {
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

export default Book