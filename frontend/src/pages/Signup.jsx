import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    universityEmail: "",
    personalEmail: "",
    studyYear: "",
    password: ""
  });

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.universityEmail,
      password: form.password,
      role: role,
    };

    try {
      signup(newUser);
      navigate(`/${role}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-kala-bg flex flex-col items-center justify-center px-4">

      <Link to="/" className="absolute top-6 left-8 text-kala-gold font-bold text-xl">
        MyUniLife
      </Link>

      {!role ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Who are you? 😉
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {["student", "admin", "club", "guest"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="border-2 border-kala-byzantium px-8 py-6 rounded-xl hover:bg-kala-byzantium hover:text-white transition"
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSignup}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-kala-gold mb-6 text-center">
            Signup as {role}
          </h2>

          {Object.keys(form).map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field}
              className="w-full border p-3 rounded-lg mb-4"
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              required
            />
          ))}

          <button className="w-full bg-kala-gold py-3 rounded-lg font-semibold">
            Signup
          </button>

          <p className="text-center mt-4">
            <button
              type="button"
              onClick={() => setRole("")}
              className="text-kala-byzantium underline"
            >
              Change role
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Signup;