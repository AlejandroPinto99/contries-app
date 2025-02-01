import PropTypes from 'prop-types'

const Input = ({ label, type, placeholder, name }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
}

export default Input