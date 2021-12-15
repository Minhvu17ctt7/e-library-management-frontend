import axiosClient from "./axiosClients";
import Cookies from 'js-cookie'
import axios from 'axios';

const bookApi = {
    getBooks: async (start, jwt) => {
        const url = `/books?_limit=8&_start=${start}`;
        return axiosClient.get(url, { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    getBookById: (id, jwt) => {
        const url = `/books/${id}`;
        return axiosClient.get(url, { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    getCategories: (jwt) => {
        return axiosClient.get("/categories", { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    getAuthors: (jwt) => {
        return axiosClient.get("/authors", { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    getProviders: (jwt) => {
        return axiosClient.get("/providers", { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    countBook: (jwt) => {
        return axiosClient.get('/books/count', { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    createBook: (data, file, jwt) => {
        console.log("jwt", jwt);
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.post('/books', formData, { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    updateBook: (data, file, id, jwt) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.put(`/books/${id}`, formData, { headers: { "Authorization": `Bearer ${jwt}` } });
    },
    deleteBook: (id, jwt) => {
        const url = `/books/${id}`;
        return axiosClient.delete(url, { headers: { "Authorization": `Bearer ${jwt}` } });
    }
}

export default bookApi;