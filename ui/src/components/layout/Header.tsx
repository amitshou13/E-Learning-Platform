import { toggleTheme } from "../../utils/themeToggle";

const Header = () => {
  return (
    <header className="bg-white dark:bg-darkSurface text-black dark:text-white p-4 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button 
          onClick={toggleTheme} 
          className="px-4 py-2 rounded bg-primary text-white hover:bg-indigo-700"
          >
            Toggle Theme
          </button>
      </div>
    </header>
  );
};

export default Header;