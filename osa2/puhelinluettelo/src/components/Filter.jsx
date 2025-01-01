const Filter = ({filterValue, handleFilterChange}) => {
    return (
        <input 
        value={filterValue}
        onChange={handleFilterChange}
        >
        </input>
    )
}
export default Filter