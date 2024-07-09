import { Nav } from "./nav";
import { Login } from "./login";

export const Header = () => (
  <header className="shadow">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="./assets/logo.png" alt="Logo" className="h-10 w-10" />
        <span className="ml-3 text-xl font-bold ">Świat kultury</span>
      </div>
      <Nav />
      <Login />
    </div>
  </header>
);
