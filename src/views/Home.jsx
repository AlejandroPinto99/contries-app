import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Select from 'react-select';
import { Continents } from '../utils/catalogs/continets';
import { useDebounce } from '../hooks/useDebounced';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
    const [countries, setCountries] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce(search, 500);

    const { theme } = useContext(ThemeContext);
    
    useEffect(() => {
        try {
        axios.get('https://restcountries.com/v3.1/all')
        .then((response) => {
            const resCountries = response.data
            setCountries(resCountries)
        })
        } catch(e) {
        console.log("Algo salió mal");
        throw e;
        }

    }, []);

    useEffect(() => {
        if(selectedContinent) {
        try {
            axios.get(`https://restcountries.com/v3.1/region/${selectedContinent}`)
            .then((response) => {
            const resCountries = response.data
            setCountries(resCountries)
            })
        } catch(e) {
            console.log("Algo salió mal");
            throw e;
        }
        } else {
        return
        }
    }, [selectedContinent]);

    useEffect(() => {
        try {
            if(debouncedValue === '') {
            axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const resCountries = response.data
                setCountries(resCountries)
            })
            } else {
            axios.get(`https://restcountries.com/v3.1/name/${debouncedValue}`)
            .then((response) => {
                const resCountries = response.data
                setCountries(resCountries)
            })
            }
        } catch(e) {
            console.log("Algo salió mal");
            throw e;
        }
        }
    , [debouncedValue]);

    return (
        <div className=" pb-8">
        <div>
            <div className="md:flex justify-between md:my-6">
                <div className="m-4 relative md:w-1/3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white absolute left-2 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text"
                        placeholder="Search for a country"
                        onChange={(e) => setSearch(e.target.value)}
                        className={`${theme === 'dark' ? 'bg-[#2B3844] text-white' : 'text-black bg-white shadow-md'}  w-full pl-8 pr-4 py-2 rounded-sm focus:ring-0 focus:outline-none`}
                    />
                </div>
                <div className="flex md:justify-end items-center w-2/3 md:mr-8">
                    <Select 
                        options={Continents}
                        onChange={(e) => {
                        setSelectedContinent(e.value);
                        }}
                        styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: `${ theme === 'dark' ? '#2B3844' : '#fff'}`,
                            width: '100%',
                            margin: '16px 10px',
                            color: theme === 'light' ? '#000' : '#fff',
                        }),
                        option: (provided) => ({
                            ...provided,
                            backgroundColor: theme === 'dark' ? '#2B3038' : '#fff',
                            color: theme === 'light' ? '#000' : '#fff',
                        }),
                        singleValue: provided => ({
                            ...provided,
                            color: theme === 'light' ? '#000' : '#fff',
                        }),
                        menu: (provided) => ({ // 'menu' is from the div class too.
                            ...provided,
                            background: theme === 'dark' ? '#2B3844' : '#fff'
                        }),
                        }}
                        placeholder="Filter by Region"
                    />
                </div>
            </div>
            {
            countries.length > 0 && (
                <div className="flex flex-col items-center space-y-4 md:grid md:grid-cols-4 md:gap-8 md:mx-8">
                {
                    countries.map((country, key) => {
                    return (
                    <Link key={key} to={`/${country.cca3}`}>
                        <Card
                            name={country.name?.common}
                            population={country.population}
                            capital={country.capital}
                            region={country.region}
                            imgSrc={country.flags.svg}
                        />
                    </Link>
                    )
                    })
                }
                </div>
            )
            }
        </div>
        </div>
  );
}

export default Home;