import axiosClient from "./axiosClients";

const bookApi = {
    getBooks: () => {
        const url = `/books`;
        return axiosClient.get(url);
    }
}

export default bookApi;