import config from './Config';

export default class Data {
    //creating api function with params
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null){
        //new url constant to hold url from config
        const url = config.apiBaseUrl + path;
        //options object with method and headers
        const options = {
          method,
          //hold content type
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          }
        }
        if(body !== null){
            //add body to options and stringify body
          options.body = JSON.stringify(body);
        }
        //if requires Auth
        if(requiresAuth){
            //encoded Credentials holds encrypted user data using btoa
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options)
    }

    //get user with email and password
    async getUser(emailAddress, password){
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});

        if(response.status === 200){
            return response.json().then(data => data);
        }else if(response.status === 401 || response.status === 400 || response.status === 500){
            return null;
        }else{
            throw new Error('Something went wrong');
        }
    }
    //create user function
    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        if(response.status === 201){
            return [];
        }else if(response.status === 400){
            return response.json().then(data => {
                return data.errors; 
            })
        }else{
            throw new Error('Something went wrong');
        }
    }
    //get courses function
    async getCourses(){
        const response = await this.api('/courses')
        if(response.status === 200){
            return response.json().then(data => data);
        }else{
            throw new Error(`Something went wrong: ${response.status}`);
        }
    }
    //course detail function
    async courseDetail(id){
        const response = await this.api(`/courses/${id}`);
        if(response.status === 200){
            return response.json().then(data => data);
        }else{
            throw new Error(`Something went wrong: ${response.status}`);
        }
    }
    //delete course function
    async deleteCourse(id, user){
        const {emailAddress, password} = user;
        const response = await this.api(`/courses/${id}`, 'DELETE', {}, true, {emailAddress, password});
        if(response.status === 204){
            return [];
        }else{
            throw new Error(`Something went wrong: ${response.status}`);
        }
    }
    //update course function
    async updateCourse(course, user){
        const {emailAddress, password} = user;
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {emailAddress, password});
        if(response.status === 204){
            return [];
        }else if(response.status === 400){
            return response.json().then(data => {
                return data.errors;
            })
        }else{
            throw new Error(`Something went wrong: ${response.status}`);
        }
    }
    //create course function
    async createCourse(course, user){
        const {emailAddress, password} = user;
        const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
        if(response.status === 201){
            return [];
        }else if(response.status === 400){
            return response.json().then(data => {
                return data.errors;
            })
        }else{
            throw new Error(`Something went wrong: ${response.status}`);
        }
    }
}

