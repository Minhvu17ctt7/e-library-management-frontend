import axiosClient from "./axiosClients";

const bookApi = {
    getBooks: (start) => {

        const url = `/books?_limit=4&_start=${start}`;
        return axiosClient.get(url);
    },
    countBook: () => {
        return axiosClient.get('/books/count');
    }
}

export default bookApi;