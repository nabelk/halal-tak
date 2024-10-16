import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export function MainSection(props) {
    const {
        handleSearchSubmit,
        searchTerm,
        handleSearchOnChange,
        handleKeyDown,
        searchSuggestion,
        selectedIndex,
        handleSelect,
    } = props;

    const suggestionRefs = useRef([]);

    useEffect(() => {
        if (suggestionRefs.current[selectedIndex]) {
            suggestionRefs.current[selectedIndex].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }, [selectedIndex]);

    return (
        <section className=' p-3 md:py-10 sm:p-5 font-mono dark:bg-gray-800 dark:text-white'>
            <div className=' mx-auto max-w-screen-xl px-4 lg:px-12'>
                <div className='h-full relative'>
                    <div
                        id='col-1'
                        className=' px-4 pt-12 md:px-12 pb-12 xl:px-12 xl:py-12 xl:bg-primary-500'
                    >
                        <h1 className=' text-teal-500 font-extrabold text-4xl md:text-6xl'>
                            Halal <br />
                            Tak <br />
                        </h1>
                        <p className='text-normal text-xl md:text-2xl pt-3 md:pt-6 font-medium'>
                            Looking for Halal dining at KLCC? Halal Tak makes it simple to find
                            trusted, Halal-certified spots in the area.
                        </p>
                    </div>
                    <form className='max-w-md mx-auto ' onSubmit={handleSearchSubmit}>
                        <label
                            htmlFor='search'
                            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                        >
                            Search
                        </label>
                        <div className='relative'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                    <svg
                                        className='w-4 h-4 text-gray-500 dark:text-gray-400'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                        />
                                    </svg>
                                </div>

                                <input
                                    type='search'
                                    autoComplete='off'
                                    id='search'
                                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'
                                    placeholder='Search dining...'
                                    value={searchTerm}
                                    onChange={handleSearchOnChange}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </div>

                            {searchSuggestion.length > 0 && (
                                <ul className='border border-gray-300 mt-2 max-h-60 overflow-y-scroll absolute w-full'>
                                    {searchSuggestion.map((suggestion, index) => {
                                        return (
                                            <li
                                                key={index}
                                                ref={(element) =>
                                                    (suggestionRefs.current[index] = element)
                                                }
                                                className={`p-2 cursor-pointer text-left ${
                                                    index === selectedIndex ? 'bg-gray-200' : ''
                                                }`}
                                                onClick={() => handleSelect(suggestion.Name)}
                                            >
                                                {suggestion.Name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

MainSection.propTypes = {
    handleSearchSubmit: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    handleSearchOnChange: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired,
    searchSuggestion: PropTypes.array.isRequired,
};
