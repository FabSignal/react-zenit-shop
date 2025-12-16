import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Completa email y contraseña");
      return;
    }
    const ok = login({ email, password });
    if (ok) {
      toast.success("Inicio de sesión correcto");
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } else {
      toast.error("Credenciales inválidas");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{ background: "var(--gradient-space)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className="card border-0 shadow-lg"
              style={{ background: "var(--deep-navy)", borderRadius: "15px" }}
            >
              <div className="card-body p-5">
                <h2 className="text-white text-center mb-4">Ingresar</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-white">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Iniciar sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
