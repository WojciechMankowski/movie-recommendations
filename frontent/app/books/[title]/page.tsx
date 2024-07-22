import axios from "axios";
import Book from "@/app/types/book";
import divideIntoParagraphs from "@/app/helper/divideIntoParagraphs";

function translateCategory(category: string): string {
  switch (category) {
    case "Biography":
      return "Biografia";
    case "Autobiography":
      return "Autobiografia";
    case "Foreign":
      return "Języki obce";
    case "Language":
      return "Językoznawstwo";
    case "Study":
      return "Nauka";
    case "Fiction":
      return "Literatura piękna";
    case "Man-woman":
      return "Relacje damsko-męskie";
    case "relationships":
      return "Relacje";
    case "Judaism":
      return "Judaizm";
    case "Forest":
      return "Lasy";
    case "animals":
      return "Zwierzęta";
    case "Social":
      return "Nauki społeczne";
    case "Science":
      return "Nauka";
    case "Deserts":
      return "Pustynie";
    case "Juvenile":
      return "Literatura dziecięca i młodzieżowa";
    case "Alchemists":
      return "Alchemicy";
    case "Domestic":
      return "Literatura domowa";
    case "fiction":
      return "Literatura piękna";
    case "Finance":
      return "Finanse";
    case "Personal":
      return "Finanse osobiste";
    case "Caulfield":
      return "Caulfield";
    case "Holden":
      return "Holden";
    case "(Fictitious":
      return "(Fikcyjna";
    case "character)":
      return "postać)";
    case "Performing":
      return "Sztuka widowiskowa";
    case "Arts":
      return "Sztuka";
    case "Culture":
      return "Kultura";
    case "Adult":
      return "Dorosłość";
    case "child":
      return "Dziecko";
    case "abuse":
      return "Nadużycie";
    case "victims":
      return "Ofiary";
    case "Murder":
      return "Morderstwo";
    case "victims'":
      return "ofiary";
    case "families":
      return "rodziny";
    case "England":
      return "Anglia";
    case "Health":
      return "Zdrowie";
    case "Fitness":
      return "Forma fizyczna";
    case "Business":
      return "Biznes";
    case "Economics":
      return "Ekonomia";
    case "Picture":
      return "Obraz";
    case "books":
      return "Książki";
    case "for":
      return "dla";
    case "children":
      return "dzieci";
    case "Artists'":
      return "Artystów";
    case "Body":
      return "Ciało";
    case "Mind":
      return "Umysł";
    case "Spirit":
      return "Duch";
    case "Young":
      return "Młody";
    case "Mines":
      return "Kopalnie";
    case "and":
      return "i";
    case "mineral":
      return "minerał";
    case "resources":
      return "zasoby";
    case "Literary":
      return "Literacka";
    case "Criticism":
      return "Krytyka";
    case "Poetry":
      return "Poezja";
    case "Political":
      return "Polityczna";
    case "corruption":
      return "Korupcja";
    case "Juvenile Fiction":
      return "Fikcja młodzieżowa";
    default:
      return category; // Jeśli kategoria nie została zdefiniowana powyżej, zwracamy ją bez zmian
  }
}

const OneBook = async ({ params }: { params: { title: string } }) => {
  const title = params.title;
  const url = `http://127.0.0.1:3000/api/books/${title}`;
  const res = await axios.get(url);

  if (res.status !== 200) {
    console.error(res);
    throw new Error("Failed to fetch the book data");
  }

  const data: Book = res.data.data[0];
  const paragraphs = divideIntoParagraphs(data.description, 5).map(
    (item, index) => <p key={index}>{item}</p>
  );

  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-full max-w-4xl mb-10">
        <div className="card shadow-xl bg-accent-color w-full flex flex-col md:flex-row  ">
          <figure className="sticky top-0">
            <img
              src={data.image_links}
              alt={data.title}
              className=""
            />
          </figure>
          <div className="card-body w-full md:w-1/2 p-5">
            <h2 className="card-title text-3xl">{data.title}</h2>
            <h3 className="font-medium">Autorzy: {data.authors}</h3>
            <div>
              <p>Data wydania: {data.published_date}</p>
              <p>Liczba stron: {data.page_count}</p>
              <p>Kategorie: {data.categories}</p>
              <h2 className="card-title text-2xl mb-4">Opis książki</h2>
            <div className=" p-5 ">{paragraphs}</div>
            </div>
          </div>

         
        </div>
      </div>

      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-center text-2xl font-bold mb-4">Rekomendacje</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {/* Placeholder for recommendations */}
        </div>
      </div>
    </div>
  );
};

export default OneBook;
