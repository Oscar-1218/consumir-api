import React, { useState,useEffect } from 'react';

import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import {helpHttp} from '../helpers/helpHttp'
import Loader from '../auxiliar/Loader';
import Message from '../auxiliar/Message';
//COMPONENTE PRINCIPAL
const CrudApi = () => {

    const [bd, setBd] = useState() //es como un array Temporario
    const [dataToEdit, setDataToEdit] = useState(null) //mientras que sea null Será insersion, si tiene dato es edición.
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let api = helpHttp();
    let url = "https://mi-api2.000webhostapp.com/libros";
    let urlDelete = "https://mi-api2.000webhostapp.com/librosdelete"; //debido a que mi server solo acepta metodo get y post


    
// **GET** actualizo bd de la aplication
    useEffect(() =>{
        setLoading(true);
        api.get(url).then(res => {
            if(!res.err){
                setBd(res)
                setError(null)
            }else{
                setBd(null)
                setError(res)
            }
            setLoading(false)
        }
    )}
    ,[url]) //el [] vacio hace que solo cargue una vez al iniciar
        
//READ/ID (post)
/*const readId = (id)=>{

    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };
    
    fetch(`${url}/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
} */

//CREATE (post)
const createData = (data,file) =>{
    let {titulo,breve_desc} = data
    var formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("breve_desc", breve_desc);
            
    if(file !== ''){   formData.append('imagen', new Blob([file], { type: file.type }));    }

    var requestOptions = {
      body: formData,
      redirect: 'follow'
    };

    api.post(url,requestOptions).then((res)=>{
        if(!res.err){ setBd([...bd,res])
        }else{ setError(res) }
    })
}


// UPDATE
async function updateData(data,file) {
    console.log('file--',file)
    let endpoint = `${url}/${data.id}` 
    let {titulo,breve_desc} = data
    let formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("breve_desc", breve_desc);
        
    if( file != null ){    formData.append('imagen', new Blob([file], { type: file.type })); }

    var options = {
        body: formData,
        redirect: 'follow'
        };
    
    api.put(endpoint,options).then((res)=>{
        if(!res.err){
            console.log('Update res:',res) 
            let newData = bd.map((el) =>(el.id === data.id? res :el))
            setBd(newData)
        }else{
            setError(res)
            }
    })
}


    // DELETE (del)
    const deleteData=(id)=>{
        let endpoint = `${urlDelete}/${id}`
        console.log('endpoint----',endpoint)
        let isDelete = window.confirm('Are you sure you want to delete?')
        if(isDelete){
            let options = {
            };

            api.del(endpoint,options)
            let newData = bd.filter(el => el.id !== id)
            setBd(newData); 
        }
    } 

  return (
    <>
        <CrudForm createData={createData} 
            updateData={updateData} 
            dataToEdit={dataToEdit} 
            setDataToEdit={setDataToEdit} />
            
        {loading && <Loader/>} 
        {error && <Message msg ={`Error ${error.status}:${error.statusText}`} bgcolor='#dc3545' />}
        {bd && <CrudTable data={bd}  
            setDataToEdit={setDataToEdit} 
            deleteData={deleteData}/>}
    
    </>
  )
}

export default CrudApi


