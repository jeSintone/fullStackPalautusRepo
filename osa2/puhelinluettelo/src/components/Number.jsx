const Number = ({newNumber, handler}) => {
    <input
        value={newNumber}
        onChange={handler}
    />
}

export default Number