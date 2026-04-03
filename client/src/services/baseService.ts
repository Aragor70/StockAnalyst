import axios from "axios";

export default class BaseService {
    
    protected static getHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    public async get(url: string, params?: any) {

        const options = {
            headers: BaseService.getHeaders(),
            params
        }

        try {
            const { data } = await axios.get(url, options);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async post(url: string, body: any) {

        const options = {
            headers: BaseService.getHeaders()
        }

        try {
            const { data } = await axios.post(url, body, options);

            return data;
        } catch (error) {
            throw error;
        }
    }
    public async put(url: string, body: any) {

        const options = {
            headers: BaseService.getHeaders()
        }

        try {
            const { data } = await axios.put(url, body, options);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async delete(url: string, params?: any) {

        const options = {
            headers: BaseService.getHeaders(),
            params
        }

        try {
            const { data } = await axios.delete(url, options);

            return data;
        } catch (error) {
            throw error;
        }
    }
}