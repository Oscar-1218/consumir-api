import React from 'react'
import CrudTableRow from './CrudTableRow'
import uuid from 'react-uuid';

//muestra encabezado y llama a bd para el renderizado.
const CrudTable = ({data,setDataToEdit, deleteData}) => {
  return (
    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 personalizado ">
      {data.length > 0  ? data.map(el=> <CrudTableRow key={el.id || uuid()} el={el} 
        setDataToEdit={setDataToEdit} 
        deleteData={deleteData}/> ) :
        <tr>Tabla vacia, sin datos para mostrar</tr> 
      }
    </div>
  )
}


export default CrudTable

