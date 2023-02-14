import React from 'react'

// crea VISTA TABLA DE DATOS
const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
  let{id,titulo,breve_desc,imagen} = el
  
  return (
    <>
      <div className="col mb-5" key={id} id={id}>
        
        <div className="card h-100">
            <img className="card-img-top" src={imagen} width="150" height="150" alt={titulo} />
            <div className="card-body p-4">
                <div className="text-center">
                    
                    <h5 className="card-title">{titulo}</h5>
                    <p className="card-text">{breve_desc}</p>
                    <div>
                      <button onClick={()=> setDataToEdit(el)} type="button" className="btn btn-success"><i className="bi bi-pencil"></i></button> 
                      <button onClick={()=> deleteData(id)} type="button" className="btn btn-danger"><i className="bi bi-trash3"></i></button> 
                    </div>
                </div>
            </div>
        </div>
        
      </div>
      </>
    )
  }


export default CrudTableRow

