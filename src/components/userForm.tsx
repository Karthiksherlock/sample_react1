import { useState } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    email: false,
    phone: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setTouched({
      ...touched,
      [name]: true,
    });

    if (name === "email") {
      if (!/^[a-zA-Z0-9]{3,}@gmail\.com$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Email must be like abc123@gmail.com",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }
    }
  };

  const isValid =
    form.firstName &&
    form.lastName &&
    form.gender &&
    form.email &&
    form.phone &&
    !errors.email &&
    !errors.phone;

  const handleSubmit = async () => {
    if (loading || !isValid) return;

    try {
      setLoading(true);

      await axios.get(
        "https://webhook.site/5b184ac3-d6c5-486e-813c-2f9e14d013e6",
        { params: form }
      );

      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>

        <div className="field">
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            maxLength={30}
            onChange={handleChange}
          />
          {touched.firstName && !form.firstName && (
            <p className="error">First name required</p>
          )}
        </div>

        <div className="field">
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            maxLength={30}
            onChange={handleChange}
          />
          {touched.lastName && !form.lastName && (
            <p className="error">Last name required</p>
          )}
        </div>

        <div className="field">
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          {touched.gender && !form.gender && (
            <p className="error">Gender required</p>
          )}
        </div>

        <div className="field">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            maxLength={50}
            onChange={handleChange}
          />
          {touched.email && !form.email && (
            <p className="error">Email required</p>
          )}
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");

              setForm({
                ...form,
                phone: value,
              });

              setTouched({
                ...touched,
                phone: true,
              });

              if (!/^[6-9][0-9]{9}$/.test(value)) {
                setErrors((prev) => ({
                  ...prev,
                  phone: "Phone must be 10 digits and start with 6-9",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  phone: "",
                }));
              }
            }}
          />
          {touched.phone && !form.phone && (
            <p className="error">Phone required</p>
          )}
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="submit-btn"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {!isValid && (
          <p className="note">
            Please fill all fields correctly
          </p>
        )}
      </div>
    </div>
  );
}

export default UserForm;