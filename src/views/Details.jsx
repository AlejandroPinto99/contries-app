import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Details = () => {
    const { name } = useParams()
    const [countryInfo, setCountryInfo] = useState();

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        try {
            if(name !== '') {
            axios.get(`https://restcountries.com/v3.1/alpha/${name}`)
            .then((response) => {
                const resCountries = response.data
                setCountryInfo(resCountries[0])
            })
            }
        } catch(e) {
            console.log("Algo salió mal");
            throw e;
        }
        }
    , [name]);

    const getStringData = (array) => {
        console.log({ array })
        if(array.length === 1) return array[0];

        const stringData = array.join(", ");

        return stringData;
    }

    return (
        <div className={`${theme === 'dark' ? 'bg-[#202C36]' : 'bg-[#fafafa]'}`}>
            {
                countryInfo && (
                    <div className="mt-8 mx-8 h-full">
                        <Link to="/" className={` ${theme === "dark" ? 'bg-[#2B3844] text-white' : 'bg-white text-black'} flex items-center w-fit space-x-2  shadow-xl p-2 rounded-sm px-4 md:shadow-none`}>
                            <ArrowLeftIcon className="h-5 w-8 "/>
                            <p>Back</p>
                        </Link>
                        <div className="md:flex md:space-x-24 md:justify-evenly">
                            <img 
                                src={countryInfo.flags.svg}
                                className="w-[320px] h-[229px] md:h-[401px] my-8 md:w-[560px]"
                            />
                            <div className={`md:grid md:grid-cols-2 md:gap-8 md:mt-4 ${theme === "light" ? 'text-black' : 'text-white'}`}>
                                <h2 className="font-extrabold  text-[22px] md:col-span-2">{countryInfo.name?.common}</h2>
                                <div className="my-4 ">
                                    <p className="font-semibold">Native Name: <span className="font-light">Belgie</span></p>
                                    <p className="font-semibold">Population: <span className="font-light">{countryInfo.population}</span></p>
                                    <p className="font-semibold">Region: <span className="font-light">{countryInfo.region}</span></p>
                                    <p className="font-semibold">Sub Region: <span className="font-light">{countryInfo.subregion}</span></p>
                                    <p className="font-semibold">Capital: <span className="font-light">{countryInfo.capital[0]}</span></p>
                                </div>

                                <div className="my-4 ">
                                    <p className="font-semibold">Top Level Domain: <span className="font-light">{countryInfo.tld[0]}</span></p>
                                    <p className="font-semibold">Currencies: <span className="font-light">{getStringData( Object.values(countryInfo?.currencies)?.map(item => item.name))}</span></p>
                                    <p className="font-semibold">Languages: <span className="font-light">{getStringData( Object.values(countryInfo?.languages))}</span></p>
                                </div>

                                {
                                countryInfo?.borders && (
                                    <div className="mb-8 md:col-span-2">
                                        <h4 className="font-semibold  text-[16px] mb-4">Border Countries</h4>
                                        <div className="grid grid-cols-3 gap-2 ">
                                            {
                                                countryInfo?.borders?.map((border, i) => {
                                                    return (
                                                        <Link to={`/${border}`} className={`${theme === "dark" ? 'bg-[#2B3844] text-white' : 'bg-white text-black'} shadow-lg rounded-xs  flex justify-center items-center p-2`} key={i}>
                                                            {border}
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Details;