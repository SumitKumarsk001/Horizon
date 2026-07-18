// import React from "react";

// type InputProps = {
//   label: string;
//   type?: string;
//   name: string;
//   value: string;
//   placeholder?: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   error?: string;
//   required?: boolean;
// };

// const Input = ({
//   label,
//   type = "text",
//   name,
//   value,
//   placeholder,
//   onChange,
//   error,
//   required = false,
// }: InputProps) => {
//   return (
//     <div className="w-full">
//       {/* Label */}
//       <label
//         htmlFor={name}
//         className="mb-2 block text-sm font-medium text-slate-700"
//       >
//         {label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       {/* Input */}
//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//         className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-200
//           ${
//             error
//               ? "border-red-500 focus:ring-2 focus:ring-red-200"
//               : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//           }`}
//       />

//       {/* Error */}
//       {error && (
//         <p className="mt-1 text-sm text-red-500">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Input;

import { type InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
};

const Input = ({
  label,
  icon,
  error,
  isPassword = false,
  type = "text",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "checkbox") {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
        <input
          {...props}
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span>{label}</span>
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </label>
    );
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div
        className={`flex items-center rounded-lg border px-3 ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      >
        {icon && <span className="mr-2 text-slate-400">{icon}</span>}

        <input
          {...props}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          className="w-full py-3 outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;