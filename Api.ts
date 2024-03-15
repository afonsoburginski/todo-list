import axios from 'axios';

const API_KEY = 'afonsoburginski';
const BASE_URL = 'https://axis-screening-process-api-59ad8a0e5e37.herokuapp.com';

export const getTasks = () => {
  return axios.get(`${BASE_URL}/todo?key=${API_KEY}`);
};

export const addTask = (newTask) => {
  return axios.post(`${BASE_URL}/todo?key=${API_KEY}`, { content: newTask });
};

export const toggleTaskDone = (taskId, done) => {
  return axios.put(`${BASE_URL}/todo/${taskId}/mark-done?key=${API_KEY}`, { done });
};

export const randomizeTasks = (count) => {
  return axios.post(`${BASE_URL}/todo/randomize?key=${API_KEY}&count=${count}`);
};