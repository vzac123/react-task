import axios from 'axios';

export const baseURL = 'https://jsonplaceholder.typicode.com/';

export const httpClient = axios.create({
  baseURL,
});
