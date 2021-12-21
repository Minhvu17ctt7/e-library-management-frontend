import axiosClient from "./axiosClients";


const memberApi = {
    getMembers: async (query) => {
        const keys = Object.keys(query);
        let params = keys.reduce((acc, key) => {
            const value = query[key];
            if (value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, '');
        const url = `/members?_limit=4&${params}`;
        return axiosClient.get(url);
    },

    getMemberById: async (id) => {
        const url = `/members/${id}`;
        return axiosClient.get(url).catch(error => console.error(error));
    },

    // getCategories: () => {
    //     return axiosClient.get("/categories");
    // },

    // getAuthors: () => {
    //     return axiosClient.get("/authors");
    // },

    // getProviders: () => {
    //     return axiosClient.get("/providers");
    // },

    countMember: async (filter) => {
        const keys = Object.keys(filter);
        let params = keys.reduce((acc, key) => {
            const value = filter[key];
            if (value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, '');
        return await axiosClient.get(`/members/count?${params}`);
    },

    createMember: (data, file) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.post('/members', formData);
    },

    updateMember: (data, file, id) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if (file) {
            formData.append('files.photo', file);
        }
        return axiosClient.put(`/members/${id}`, formData);
    },
    deleteMember: (id) => {
        const url = `/members/${id}`;
        return axiosClient.delete(url);
    }
}

export default memberApi;
