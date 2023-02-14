
const Loader =()=>{
    return(
        <>
            <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status"> {/*tiene la propiedad de hacerlo girar */}
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        </>
    )
}
export default Loader