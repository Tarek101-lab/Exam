import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
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
          className="w-full bg-green-500 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;