import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange, placeholder = "Buscar productos..." }) {
  return (
    <div className="position-relative">
      <FiSearch
        className="position-absolute text-white-50"
        style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
      />
      <input
        type="text"
        className="form-control ps-5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      />
    </div>
  );
}

export default SearchBar;
