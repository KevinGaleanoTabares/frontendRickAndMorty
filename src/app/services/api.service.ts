import axios from 'axios';

const API = 'http://localhost:3000';

export const registerUser = (data:any) => {
    return axios.post(`${API}/register`, data);
};

export const loginUser = (data:any) => {
    return axios.post(`${API}/login`, data);
}

export const getUsers = () => {
    return axios.get(`${API}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            
        }
    });
};

export const getCharacters = () => {
    return axios.get('https://rickandmortyapi.com/api/character');
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