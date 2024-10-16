import { useState, useEffect } from 'react';
import { MainSection } from './components/mainSection';
import { ResultModal } from './components/resultModal';
import { DarkMode } from './components/darkMode';
import { Footer } from './components/footer';
import { fetchData } from './utils/api';
import { convertJsonSheet } from './utils/sheetJsonUtils';
import { normalizeString } from './utils/normalizeStringUtils';
import './App.css';

function App() {
    const [diningList, setDiningList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestion, setSearchSuggestion] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [searchResult, setSearchResult] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData(import.meta.env.VITE_API_URL)
            .then((datas) => setDiningList(convertJsonSheet(datas.data.values)))
            .catch((err) => console.log(err));
    }, []);

    const handleModalVisibility = (bool) => setOpenModal(bool);

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

    return (
        <>
            <div className='dark:bg-gray-800 h-full w-full relative'>
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
                ></MainSection>
            </div>
            <Footer></Footer>
        </>
    );
}

export default App;
