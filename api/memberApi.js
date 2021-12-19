import axiosClient from "./axiosClients";


const memberApi = {
    getMembers: async (start) => {
        const url = `/members?_limit=8&_start=${start}`;
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

    countMember: () => {
        return axiosClient.get('/members/count');
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