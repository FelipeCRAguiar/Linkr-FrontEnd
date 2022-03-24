import api from './api';

export async function signUp (user) {
        
        return api.post('/sign-up', {
          ...user
        });
}