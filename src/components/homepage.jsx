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
import Loading from './loading';

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
                    <div className='absolute flex justify-center items-center'>
                        <Loading />
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
