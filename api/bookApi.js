import axiosClient from "./axiosClients";


const bookApi = {
    getBooks: async (query, limit = 4) => {
        const keys = Object.keys(query);
        let params = keys.reduce((acc, key) => {
            const value = query[key];
            if (value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, '');
        const url = `/books?_limit=${limit}&${params}`;
        return axiosClient.get(url);
    },

    getBookById: (id) => {
        const url = `/books/${id}`;
        return axiosClient.get(url);
    },

    getCategories: () => {
        return axiosClient.get("/categories");
    },

    getAuthors: () => {
        return axiosClient.get("/authors");
    },

    getProviders: () => {
        return axiosClient.get("/providers");
    },

    countBook: (query) => {
        const url = '/books/count';
        if (query != null) {
            const keys = Object.keys(query);
            let params = keys.reduce((acc, key) => {
                const value = query[key];
                if (value) {
                    return `${acc}&${key}=${value}`;
                }
                return acc;
            }, '');
            url += `?${params}`
        }
        return axiosClient.get(url);

    },

    createBook: (data, file) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.post('/books', formData);
    },

    updateBook: (data, file, id) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.put(`/books/${id}`, formData);
    },
    deleteBook: (id) => {
        const url = `/books/${id}`;
        return axiosClient.delete(url);
    }
}

export default bookApi;