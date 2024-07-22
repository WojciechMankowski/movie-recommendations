'use client'
import { BookProps } from "../types/props";
import Link from "next/link";

function translateCategory(category: string) {
    switch (category) {
        case 'Biography':
            return 'Biografia';
        case 'Autobiography':
            return 'Autobiografia';
        case 'Foreign':
            return 'Języki obce';
        case 'Language':
            return 'Językoznawstwo';
        case 'Study':
            return 'Nauka';
        case 'Fiction':
            return 'Literatura piękna';
        case 'Man-woman':
            return 'Relacje damsko-męskie';
        case 'relationships':
            return 'Relacje';
        case 'Judaism':
            return 'Judaizm';
        case 'Forest':
            return 'Lasy';
        case 'animals':
            return 'Zwierzęta';
        case 'Social':
            return 'Nauki społeczne';
        case 'Science':
            return 'Nauka';
        case 'Deserts':
            return 'Pustynie';
        case 'Juvenile':
            return 'Literatura dziecięca i młodzieżowa';
        case 'Alchemists':
            return 'Alchemicy';
        case 'Domestic':
            return 'Literatura domowa';
        case 'fiction':
            return 'Literatura piękna';
        case 'Finance,':
            return 'Finanse';
        case 'Personal':
            return 'Finanse osobiste';
        case 'Caulfield,':
            return 'Caulfield';
        case 'Holden':
            return 'Holden';
        case '(Fictitious':
            return '(Fikcyjna';
        case 'character)':
            return 'postać)';
        case 'Performing':
            return 'Sztuka widowiskowa';
        case 'Arts':
            return 'Sztuka';
        case 'Culture':
            return 'Kultura';
        case 'Adult':
            return 'Dorosłość';
        case 'child':
            return 'Dziecko';
        case 'abuse':
            return 'Nadużycie';
        case 'victims':
            return 'Ofiary';
        case 'Murder':
            return 'Morderstwo';
        case "victims'":
            return 'ofiary';
        case 'families':
            return 'rodziny';
        case 'England':
            return 'Anglia';
        case 'Health':
            return 'Zdrowie';
        case 'Fitness':
            return 'Forma fizyczna';
        case 'Business':
            return 'Biznes';
        case 'Economics':
            return 'Ekonomia';
        case 'Picture':
            return 'Obraz';
        case 'books':
            return 'Książki';
        case 'for':
            return 'na';
        case 'children':
            return 'dzieci';
        case "Artists'":
            return 'Artystów';
        case 'Body,':
            return 'Ciało,';
        case 'Mind':
            return 'Umysł';
        case 'Spirit':
            return 'Duch';
        case 'Young':
            return 'Młody';
        case 'Mines':
            return 'Kopalnie';
        case 'and':
            return 'ix';
        case 'mineral':
            return 'minerał';
        case 'resources':
            return 'zasoby';
        case 'Literary':
            return 'Literacka';
        case 'Criticism':
            return 'Krytyka';
        case 'Poetry':
            return 'Poezja';
        case 'Political':
            return 'Polityczna';
        case 'corruption':
            return 'Korupcja';
        default:
            return category; // Jeśli kategoria nie została zdefiniowana powyżej, zwracamy ją bez zmian
    }
}



export const Book: React.FC<BookProps> = ({
  id,
  title,
  authors,
  published_date,
  description,
  page_count,
  print_type,
  categories,
  maturity_rating,
  contains_epub_bubbles,
  language,
  canonical_volume_link,
  image_links,
}) => {
   
    const categories_p = categories.split(" ").map(item => <p key={item}>{
        translateCategory(item)
    }</p>)
  return (
    <div key={id} className="w-full h-50 bg-gray-300 rounded-xl p-10 relative">
      <Link href={`/books/${title}`}>
        <h2 className="text-5xl font-extrabold">{title}</h2>
        <h2 className="text-4xl font-extrabold">{authors}</h2>
        <img src={image_links} alt="" className="h-80 max-w-lg mx-auto object-center p-5" />
    </Link>
      <div className="metadata pt-5 text-2xl">
        {categories_p}
        <p>
          <strong>Data wydania:</strong> {published_date}
        </p>
      </div>
    </div>
  );
};
