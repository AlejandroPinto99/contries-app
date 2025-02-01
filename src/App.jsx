import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './views/Home';
import Details from './views/Details';
import { ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect } from 'react';

function App() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if(theme === 'dark') {
      document.body.classList.add('bg-[#202C36]')
    } else {
      document.body.classList.remove('bg-[#202C36]')
    }
  }, [theme])
  
  return (
    <div className={`${theme === 'dark' ? 'bg-[#202C36]' : 'bg-[#FAFAFA]'} `}>
      <header className={`${theme === 'dark' ? 'bg-[#2B3844] text-white' : 'text-black bg-white' } flex justify-between items-center px-2 h-[80px] shadow-md`}>
        <h1 className="text-xs font-extrabold md:text-lg">Where in the World?</h1>
        <button type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center light:bg-white dark:bg-[#2B3844] font-semibold text-xs space-x-2"
        >
            { theme === 'light' ? <SunIcon className="h-4 w-4 md:h-8 md:w-8"/> : <MoonIcon className="h-4 w-4 md:h-8 md:w-8"/> }
            <p className="md:text-lg">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
        </button>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route 
          path="/:name"
          element={
            <Details />
          }
        />
      </Routes>
    </div>
  );
}

export default App;