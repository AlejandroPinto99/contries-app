import PropTypes from 'prop-types'
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Card = ({ imgSrc, name, population, region, capital }) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className={`${theme === 'dark' ? 'bg-[#2B3844]' : 'bg-white shadow-md'} w-64 md:w-full h-[336px]  rounded-lg`}>
            <img src={imgSrc} alt={name} className="w-full max-h-[150px]"/>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-black' } flex flex-col pl-8 justify-center`}>
                <h3 className="text-lg my-4 font-extrabold">{name}</h3>
                <div >
                    <div>
                        <p className="font-semibold">Popuplation: <span className="font-light">{population}</span></p>
                    </div>
                    <div>
                        <p className="font-semibold">Region: <span className="font-light">{region}</span></p>
                    </div>
                    <div>
                        <p className="font-semibold">Capital: <span className="font-light">{capital}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
}

export default Card;