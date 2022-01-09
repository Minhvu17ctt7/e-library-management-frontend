import axiosClient from "./axiosClients";


const transactionApi = {
    getTransactions: async (query, limit = 4) => {
        const keys = Object.keys(query);
        let params = keys.reduce((acc, key) => {
            const value = query[key];
            if (value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, '');
        const url = `/transactions?_limit=${limit}&${params}`;
        return axiosClient.get(url);
    },

    getTransactionById: (id) => {
        const url = `/transactions/${id}`;
        return axiosClient.get(url);
    },

    getMembers: () => {
        return axiosClient.get("/members");
    },

    getBooks: () => {
        return axiosClient.get("/books");
    },

    getAuthors: () => {
        return axiosClient.get("/authors");
    },

    getProviders: () => {
        return axiosClient.get("/providers");
    },

    countTransaction: async (filter) => {
        const keys = Object.keys(filter);
        let params = keys.reduce((acc, key) => {
            const value = filter[key];
            if (value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, '');
        return await axiosClient.get(`/transactions/count?${params}`);
    },
    countTransaction2: (query) => {
        const url = '/transactions/count';
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
    createTransaction: (data, file) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.post('/transactions', formData);
    },

    createTransactionDetail: (data, file) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.post('/transaction-details', formData);
    },

    updateTransaction: (data, file, id) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        console.log(formData);
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.put(`/transactions/${id}`, formData);
    },

    updateTransactionDetail: (data, file, id) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        console.log(formData);
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.put(`/transaction-details/${id}`, formData);
    },
    deleteTransaction: (id) => {
        const url = `/transactions/${id}`;
        return axiosClient.delete(url);
    },
    deleteTransactionDetail: (id) => {
        const url = `/transaction-details/${id}`;
        return axiosClient.delete(url);
    }
}

export default transactionApi;
