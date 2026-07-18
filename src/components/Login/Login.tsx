import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import {  FiMail, FiLock } from "react-icons/fi";
import Input from "../FormComponent/Input";
import Button from "../FormComponent/Button";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
  email: "",
  password: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error while typing
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  console.log("Login Successful");
  console.log(formData);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  localStorage.setItem("isLoggedIn", "true");
  if (
    formData.email === user.email &&
    formData.password === user.password
  ) {
    navigate("/dashboard");
  } else {
    alert("Invalid Email or Password");
  }
        
};

const validateForm = () => {
  const newErrors = {
    email: "",
    password: "",
  };

  let isValid = true;

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newErrors.email = "Please enter a valid email";
    isValid = false;
  }

  // Password validation
  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            Horizon
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Login to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <Input
  label="Email"
  type="email"
  name="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  icon={<FiMail />}
/>

          {/* Password */}
  
          <Input
  label="Password"
  type="password"
  name="password"
  placeholder="Enter password"
  value={formData.password}
  onChange={handleChange}
  error={errors.password}
  icon={<FiLock />}
  isPassword
/>

          {/* Remember */}

          <div className="flex items-center justify-between text-sm">
            <Input
              label="Remember Me"
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />

            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}

          <Button type="submit" variant="primary">
            Login
          </Button>

        </form>

        <p className="mt-6 text-center text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="ml-1 font-semibold text-blue-600"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Login;