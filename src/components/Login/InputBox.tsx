import PropTypes from "prop-types";
import styles from "./InputBox.module.css";

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputBox.defaultProps = {
  placeholder: "",
};

export default function InputBox({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} body_18_R`}
    />
  );
}
