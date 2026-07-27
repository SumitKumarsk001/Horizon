import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
} from "react-icons/fi";
import Input from "../../components/FormComponent/Input";
import Button from "../../components/FormComponent/Button";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { login } from "../../features/auth/authSlice";
import { registerUser } from "../../services/authService";
import axios from "axios";
import { toast } from "react-toastify";


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
 
 });

const navigate = useNavigate();
const dispatch = useAppDispatch();

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
   const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await registerUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
   //console.log('form data response'+response);
   
    dispatch(login(response.data.user));
     //console.log("dispatch"+dispatch);
     
    navigate("/dashboard");
    toast.success("Account Created Successfully");
    //console.log('navigate to'+navigate);
    
  } catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 400) {
      setErrors((prev) => ({
        ...prev,
        email: error.response?.data.message,
      }));
    }
  } else {
    console.error(error);
  }
}
};

  const validateForm = () => {
  const newErrors = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  let isValid = true;

  // First Name
  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
    isValid = false;
  }

  // Last Name
  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
    isValid = false;
  }

  // Email
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newErrors.email = "Enter a valid email";
    isValid = false;
  }

  // Phone
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
    isValid = false;
  } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10-digit phone number";
    isValid = false;
  }

  // Password
  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
    isValid = false;
  }

  // Confirm Password
  if (!formData.confirmPassword.trim()) {
    newErrors.confirmPassword = "Confirm your password";
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
    isValid = false;
  }


  setErrors(newErrors);

  return isValid;
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}

        <div className="mb-4 text-center">

          <h1 className="text-3xl font-bold text-blue-600">
            Horizon
          </h1>

          <h2 className="mt-2 text-2xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Register to access your dashboard
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          {/* First Name */}

          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            icon={<FiUser />}
          />

          {/* Last Name */}

          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            icon={<FiUser />}
          />

          {/* Email */}

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<FiMail />}
          />

          {/* Phone */}

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            icon={<FiPhone />}
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

          {/* Confirm Password */}

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={<FiLock />}
            isPassword
          />

          {/* Register Button */}

          <Button type="submit" variant="primary" className="w-full">
            Register
          </Button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?

          <Link
            to="/login"
            className="ml-1 font-semibold text-blue-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;