export const helpHttp =()=>{
    
    const customfetch = (endpoint,options) =>{
        const defaultHeader = {
            accept: "application/json", 
        }
        // let formData = new FormData();
        const controller = new AbortController(); //esta echa con la finalidad de si el servdor esta caido.

        options.signal = controller.signal;
        options.method = options.method || "GET";
        options.headers = options.headers?{...defaultHeader,...options.headers}:defaultHeader; 
        // options.body = JSON.stringify(options.body) || false; //esta linea me genera conflicto
        /*if (options.body) {
            for (let key in options.body) {
            formData.append(key, options.body[key]);
            } //chatGPT
        }*/

        if(!options.body) delete options.body;
        setTimeout(() => {
            controller.abort();
        }, 30000);


        return( 
            fetch(endpoint,options).then((res) => res.ok ? res.json()  : Promise.reject({
                err:true,
                status: res.status || '00',
                statusText: res.statusText || 'ocurrio un error statustext'
            })
            ).catch((err) => err)
        )
    }
        const get = (url,options = {}) => customfetch(url,options)

        const post = (url,options = {}) => {options.method = 'POST'; //CREATE id
        return customfetch(url,options)}

        const put = (url,options = {}) => {options.method = 'POST'; //UPDATE
        return customfetch(url,options)}

        const del = (url,options = {}) => {options.method = 'POST'; //DELETE
        return customfetch(url,options)}
    return{
        get,post,put,del
    }

}
