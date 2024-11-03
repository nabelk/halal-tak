import { useState, useEffect } from 'react';
import { MainSection } from '../components/mainSection';
import { ResultModal } from '../components/resultModal';
import { DarkMode } from '../components/darkMode';
import { Footer } from '../components/footer';
import { TCModal } from '../components/tcModal';
import { fetchData } from '../utils/api';
import { convertJsonSheet } from '../utils/sheetJsonUtils';
import { normalizeString } from '../utils/normalizeStringUtils';
import { Navigate } from 'react-router-dom';
import Error500 from './500';

function Homepage() {
    const [diningList, setDiningList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestion, setSearchSuggestion] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchResult, setSearchResult] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openTCModal, setOpenTCMOdal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = (token) => {
        fetch('/api/data/KLCC', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Token': token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Data fetch failed');
                }
                return res.json();
            })
            .then((datas) => {
                setDiningList(convertJsonSheet(datas));
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetch('/api/token', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                const token = data.token;

                return fetchData(token);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const handleModalVisibility = (bool) => setOpenModal(bool);
    const handleTCModalVIsibility = (bool) => setOpenTCMOdal(bool);

    const handleSearchOnChange = (e) => {
        const searchInput = e.target.value;
        setSearchTerm(searchInput);

        if (searchInput) {
            const normalizedSearchTerm = normalizeString(searchInput);

            const filteredSuggestions = diningList.filter((dining) =>
                normalizeString(dining.Name).includes(normalizedSearchTerm),
            );

            setSearchSuggestion(filteredSuggestions);
        } else {
            setSearchSuggestion([]);
        }
    };

    const handleSearchDirectly = (searchValue) => {
        setSearchResult(
            diningList.find((list) =>
                normalizeString(list.Name).includes(normalizeString(searchValue)),
            ),
        );
        setOpenModal(!false);
        setSearchTerm('');
    };

    const handleKeyDown = (e) => {
        switch (true) {
            case e.key === 'ArrowDown':
                setSelectedIndex((prev) => Math.min(prev + 1, searchSuggestion.length - 1));
                break;
            case e.key === 'ArrowUp':
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
                break;
            case e.key === 'Enter' && selectedIndex !== -1:
                if (searchSuggestion.length > 0)
                    setSearchTerm(searchSuggestion[selectedIndex].Name);
                setSearchSuggestion([]);
        }
    };

    const handleSelect = (suggestion) => {
        setSearchTerm(suggestion);
        setSearchSuggestion([]);
        handleSearchDirectly(suggestion);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const findDining = diningList.find((list) =>
            normalizeString(list.Name).includes(normalizeString(searchTerm)),
        );
        setSearchResult(findDining);
        setOpenModal(!false);
        if (findDining) setSearchTerm('');
    };

    if (error)
        return (
            <>
                <Error500 isRouter={true} />
            </>
        );

    return (
        <>
            <div className='dark:bg-gray-800 h-full w-full relative'>
                {loading && (
                    <div role='status'>
                        <svg
                            aria-hidden='true'
                            className='w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                            />
                            <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                            />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                    </div>
                )}
                <DarkMode></DarkMode>
                <ResultModal
                    onClickHandleModalVisibility={handleModalVisibility}
                    openModalCurState={openModal}
                    choosenDiningToDisplay={searchResult}
                    searchTerm={searchTerm}
                ></ResultModal>
                <MainSection
                    handleSearchSubmit={handleSearchSubmit}
                    handleSearchOnChange={handleSearchOnChange}
                    handleKeyDown={handleKeyDown}
                    handleSelect={handleSelect}
                    searchTerm={searchTerm}
                    selectedIndex={selectedIndex}
                    searchSuggestion={searchSuggestion}
                    isLoading={loading}
                    isError={error}
                ></MainSection>
                <TCModal
                    tcModalCurState={openTCModal}
                    handleTCModalVIsibility={handleTCModalVIsibility}
                ></TCModal>
            </div>
            <Footer handleTCModalVIsibility={handleTCModalVIsibility}></Footer>
        </>
    );
}

export default Homepage;
