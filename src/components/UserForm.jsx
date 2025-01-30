import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/styles.css";

const UserForm = ({ initialUser, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialUser) {
      setFormData(initialUser);
    }
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      company:
        name === "companyName"
          ? { ...prev.company, name: value }
          : prev.company,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formData.name && emailRegex.test(formData.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      navigate("/");
    } else {
      alert("Please fill all fields correctly");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{initialUser ? "Update User" : "Add New User"}</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Company</label>
        <input
          type="text"
          name="companyName"
          value={formData.company.name}
          onChange={handleChange}
        />
      </div>
      <div className="button-group">
        <button type="submit" className="primary">
          {initialUser ? "Update User" : "Add User"}
        </button>
        <button type="button" onClick={handleCancel} className="secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  initialUser: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
