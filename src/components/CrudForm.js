import React from 'react'
import { useState, useEffect } from 'react'


const initialForm ={
    titulo:'',breve_desc:'',imagen:'',id:null
}


// EVENTOS y FUNCIONES
const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {
    
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({initialForm})
    
    useEffect(() => { 
        if(dataToEdit){
            setForm(dataToEdit)}
            else{
                setForm(initialForm)
            }
        }, [dataToEdit])

        //handle= manejar
        const handleChange =(e)=>{
            if(e.target.name === 'imagen'){
                setFile(e.target.files[0])
            }                
            setForm({...form,[e.target.name]: e.target.value})
            
        }

            
        // envio de formulario
    const handleSubmit = (e)=>{ 
        e.preventDefault()
        if(!form.titulo || !form.breve_desc ){
            alert("Datos incompletos")
            return // == BREAK en CASE 
        }
        if(form.id === null){
            createData(form,file) //esto se pasa al componente padre
        }else{
            updateData(form,file)
        }
        handleReset()
    }

    
    //limpiar campos formulario 
    const handleReset = (e)=>{
        setForm(initialForm) 
        setFile(null)
        setDataToEdit(null)
    }
    
    

    return (
    <div className='container mb-3'>
        <h3>{dataToEdit ? 'Editar' : 'Agregar'}</h3>
        <form onSubmit={handleSubmit} className="container-md" method="post" encType="multipart/form-data" >
    <div className="mb-3">
        <input name="titulo" onChange={handleChange} value={form.titulo || ''}  placeholder="Nombre" type="text" className="form-control"/>
    </div>
    <div className="mb-3">
        <textarea name="breve_desc" onChange={handleChange} value={form.breve_desc || '' } placeholder="Describa" type="text" className="form-control" ></textarea>
    </div>
    <div className="mb-3">
        
        {dataToEdit ? <> {form.imagen && 
            <img className="card-img-top" src={form.imagen} style={{ maxWidth: 220, maxHeight:190 }} alt={form.titulo+'.imagen'} /> }
            <input type="file" className="form-control" accept="image/*" name="imagen" placeholder="imagen"
            onChange={handleChange}  ></input>
        
            {/* Agregar */}
            </> :  
            <input type="file" className="form-control" accept="image/*" name="imagen" placeholder="imagen"
            onChange={handleChange} value={form.imagen || ''} ></input> 
        }

        
    </div>

    <button type="submit" className="btn btn-primary" value='enviar'>Submit</button>
    <button type='reset' className="btn btn-success"  value='limpiar' onClick={handleReset}>Limpiar</button>
                

        </form>
    </div>
  )
}

export default CrudForm