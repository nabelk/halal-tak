import { useEffect, useState } from 'react';
import { IoMoon } from 'react-icons/io5';
import { IoSunny } from 'react-icons/io5';

export function DarkMode() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        document.body.classList.toggle('dark', dark);
    }, []);

    const darkModeHandler = () => {
        setDark((prevDark) => {
            const newDark = !prevDark;
            document.body.classList.toggle('dark', newDark);
            return newDark;
        });
    };

    return (
        <div className='bg-white dark:bg-gray-800 absolute dark:text-white text-xl top-[5%] right-[14%]'>
            <button className='toggle-theme' onClick={darkModeHandler}>
                {dark ? <IoSunny /> : <IoMoon />}
            </button>
        </div>
    );
}
