export const convertJsonSheet = (arr) => {
    const headers = arr[0];

    return arr.slice(1).map((row) => {
        return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
        }, {});
    });
};
