import axiosClient from "./axiosClients";


const bookApi = {
    getBooks: async (start) => {
        const url = `/books?_limit=8&_start=${start}`;
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

    countBook: () => {
        return axiosClient.get('/books/count');
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