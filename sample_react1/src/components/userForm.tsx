import { useState } from "react";

function UserForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <br /><br />

      <input name="lastName" placeholder="Last Name" onChange={handleChange} />

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

export default UserForm;