import axios from 'axios';

export const fetchData = async (url, delay = 1000, count = 1) => {
    try {
        const res = await axios(url);
        return res;
    } catch (err) {
        if (count === 5) throw err;
        console.log('Fetch failed, retrying...');
        await new Promise((res) => setTimeout(res, delay));
        return fetchData(url, delay, count + 1);
    }
};
