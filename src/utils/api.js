import axios from 'axios';

export const fetchData = async (url) => {
    const res = await axios(url);
    return res;
};
