import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000";

function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
      });
      console.log(res.data);

      alert("Registered successfully");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      alert("Register failed");
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl bg-white">
      <h1>Register</h1>
      <form onSubmit={Register} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default register;
