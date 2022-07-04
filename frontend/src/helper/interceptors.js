import axios from 'axios'
import router from '../router/index'

export default () => {
    axios.interceptors.response.use((response) => {
        return response; 
    }, (error) => {
        if(error.response.status == 401) {
            console.log('token expire');
            localStorage.removeItem('token');
            localStorage.removeItem('user')
            return router.push({path: '/login'})
        }
        return Promise.reject(error)
    })
}
