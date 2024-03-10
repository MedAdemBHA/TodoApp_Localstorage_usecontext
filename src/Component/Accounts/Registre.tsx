import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// import "./Registre.css";
import { useNavigate } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  password: string;
  id: string;
};
export default function Registre() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      id: "",
    },
  });

  const handleRegistration = (data: FormValues) => {
    const users = JSON.parse(localStorage.getItem("user") || "[]");
    data.id = crypto.randomUUID();

    const newuser = [...users, data];
    console.log("newuser", newuser);

    localStorage.setItem("user", JSON.stringify(newuser));
    reset();
    navigate("/login");
  };
  const handleLogin = () => {
    navigate("/");
  };

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
    <div className="login">
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name", registerOptions.name /* validation rules   */)} //Register with validation and error messageRegister with validation and error message
          />
          {/* <small className="text-danger">
          {errors?.name && errors.name.message}
        </small> */}
          <ErrorMessage errors={errors} name="name" as="small" />
        </div>
        <div>
          <label>Email</label>
          <input {...register("email", registerOptions.email)} />
          <ErrorMessage errors={errors} name="email" as="small" />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", registerOptions.password)}
          />
          <small className="text-danger">
            <ErrorMessage
              className=""
              errors={errors}
              name="password"
              as="small"
            />
          </small>
        </div>
        <div className="BTN">
          <button>ReGistre</button>
          <hr />
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}
