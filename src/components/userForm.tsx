import { useState } from "react";
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
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
  try {
    await axios.get(
      "https://webhook.site/b25d9f88-8f62-43f4-8134-30326b795f5c",
      { params: form }
    );

    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
  };
  return (
    <div>
      <h2>User Form</h2>

      {/* First Name */}
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />
      {!form.firstName && <p style={{ color: "red" }}>First name required</p>}
      <br />

      {/* Last Name */}
      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
      />
      {!form.lastName && <p style={{ color: "red" }}>Last name required</p>}
      <br />

      {/* Gender */}
      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
      {!form.gender && <p style={{ color: "red" }}>Gender required</p>}
      <br />

      {/* Email */}
      <input
        name="email"
        placeholder="Email (example@gmail.com)"
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      <br />

      {/* Phone */}
      <input
        name="phone"
        placeholder="Phone (10 digits)"
        onChange={handleChange}
      />
      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      <br />

      {/* Submit */}
      <button type="button" onClick={handleSubmit} disabled={!isValid}>
        Submit
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