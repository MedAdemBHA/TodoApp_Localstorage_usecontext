import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AuthContext } from "../../App";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

type FormValues = {
  email: string;
  password: string;
  id: string;
};
type User = {
  email: string;
  password: string;
  id: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegistration = (data: FormValues) => {
    const loggeduser = JSON.parse(localStorage.getItem("user") || "[]");

    let isUserAuthenticated = false;

    loggeduser.forEach((user: User) => {
      if (data.email === user.email && data.password === user.password) {
        isUserAuthenticated = true;
        data.id = user.id;
        return;
      }
    });
    if (isUserAuthenticated) {
      navigate("/About");

      localStorage.setItem("currentUser", JSON.stringify(data));
      setAuth(data);
    } else {
      alert("Wrong Email or Password");
    }
    reset();
  };

  const handleRegistre = () => {
    navigate("/Registre");
  };

  // console.log("register", registe

  const registerOptions = {
    name: { required: "Name is required" },
    email: {
      required: "Email is required",
      message: "",
      pattern: {
        value: /...@gmail.com/i,
        message: "domaine@gmail",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <div>
      {auth.id ? (
        <div>
          <div>you are logeddin</div>
        </div>
      ) : (
        <div className="login">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div>
              <label>Email</label>
              <input
                className="input-field"
                type="email"
                {...register("email", registerOptions.email)}
              />
              <small className="error-message">
                <ErrorMessage errors={errors} name="email" as="small" />
              </small>
            </div>
            <div>
              <label>Password</label>
              <input
                className="input-field"
                type="password"
                {...register("password", registerOptions.password)}
              />
              <small className="error-message">
                <ErrorMessage
                  className=""
                  errors={errors}
                  name="password"
                  as="small"
                />
              </small>
            </div>
            <br />
            <div className="BTN">
              <button type="submit" className="login-button">
                Login
              </button>

              <hr />

              <button onClick={handleRegistre} className="register-button">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
