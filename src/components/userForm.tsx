import { useState, useRef } from "react";
import axios from "axios";

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

  const isSubmitting = useRef(false);

  const handleChange = (e: any) => {
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
      if (!/^[a-zA-Z]{3,}@gmail\.com$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Email must be like abc@gmail.com (min 3 letters)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "phone") {
      if (!/^[6-9][0-9]{9}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone must be 10 digits and start with 6-9",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const isValid =
    form.firstName &&
    form.lastName &&
    form.gender &&
    !errors.email &&
    !errors.phone &&
    form.email &&
    form.phone;

  const handleSubmit = async () => {
    if (isSubmitting.current) return;

    isSubmitting.current = true;

    try {
      setLoading(true);

      await axios.get(
        "https://webhook.site/5b184ac3-d6c5-486e-813c-2f9e14d013e6",
        { params: form }
      );

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>

      {/* First Name */}
      <div style={{ marginBottom: "10px" }}>
        <label>First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          placeholder="Enter first name"
          maxLength={30}
          onChange={handleChange}
        />
        {touched.firstName && !form.firstName && (
          <p style={{ color: "red" }}>First name required</p>
        )}
      </div>

      {/* Last Name */}
      <div style={{ marginBottom: "10px" }}>
        <label>Last Name</label>
        <input
          name="lastName"
          value={form.lastName}
          placeholder="Enter last name"
          maxLength={30}
          onChange={handleChange}
        />
        {touched.lastName && !form.lastName && (
          <p style={{ color: "red" }}>Last name required</p>
        )}
      </div>

      {/* Gender */}
      <div style={{ marginBottom: "10px" }}>
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
          <p style={{ color: "red" }}>Gender required</p>
        )}
      </div>

      {/* Email */}
      <div style={{ marginBottom: "10px" }}>
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          maxLength={256}
          placeholder="Email (example@gmail.com)"
          onChange={handleChange}
        />
        {touched.email && !form.email && (
          <p style={{ color: "red" }}>Email required</p>
        )}
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div style={{ marginBottom: "10px" }}>
        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          maxLength={10}
          placeholder="Phone (10 digits)"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");

            setForm((prev) => ({
              ...prev,
              phone: value,
            }));

            setTouched((prev) => ({
              ...prev,
              phone: true,
            }));

            if (!/^[6-9][0-9]{9}$/.test(value)) {
              setErrors((prev) => ({
                ...prev,
                phone: "Phone must be 10 digits and start with 6-9",
              }));
            } else {
              setErrors((prev) => ({ ...prev, phone: "" }));
            }
          }}
        />
        {touched.phone && !form.phone && (
          <p style={{ color: "red" }}>Phone required</p>
        )}
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid || loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* General Note */}
      {!isValid && (
        <p style={{ color: "orange" }}>
          Please fill all fields correctly to enable submit
        </p>
      )}
    </div>
  );
}

export default UserForm;