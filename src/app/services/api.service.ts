import axios from 'axios';

const API = 'http://localhost:3000';

export const registerUser = (data:any) => {
    return axios.post(`${API}/auth/register`, data);
};

export const loginUser = (data:any) => {
    return axios.post(`${API}/auth/login`, data);
}

export const getUsers = () => {
    return axios.get(`${API}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            
        }
    });
};

export const getCharacters = (page:number = 1) => {

    return axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
}

export const deleteUser = (id: string) => {
      const token = localStorage.getItem('token');

          console.log('id', id);
          console.log('token', token);

    return axios.delete(`http://localhost:3000/users/${id}`,{
     headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});
};

export const updateUser = (id: string, data: any) => {
    const token = localStorage.getItem('token');
        
        console.log('id', id);
          console.log('token', token);

    return axios.put(`http://localhost:3000/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
});
};

export const getProfile = () => {

    return axios.get(`${API}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};