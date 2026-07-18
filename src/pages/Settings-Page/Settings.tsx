import { useState } from "react";
import { FiBell, FiMoon, FiSun, FiUser, FiMail, FiPhone } from "react-icons/fi";
import Input from "../../components/FormComponent/Input";
import Button from "../../components/FormComponent/Button";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
};

const Settings = () => {
  const [user, setUser] = useState<User>(() => {
    if (typeof window === "undefined") {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        profileImage: "",
      };
    }

    const storedUser = localStorage.getItem("user");
    return storedUser
      ? (JSON.parse(storedUser) as User)
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          profileImage: "",
        };
  });

  const [notifications, setNotifications] = useState(true);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  const saveUser = (updatedUser: User) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new CustomEvent("userUpdated"));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(updatedUser);
    saveUser(updatedUser);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = {
        ...user,
        profileImage: reader.result as string,
      };
      setUser(updatedUser);
      saveUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveUser(user);
    alert("Profile Updated Successfully");
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Settings
        </h1>

        <p className="text-slate-500">
          Manage your account preferences.
        </p>
      </div>

      {/* Profile */}

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">

          <img
            src={
              user.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgl6XLGmKN4GX1drT9TmSldDW2TZCpG2p3tEIiJWY7QQ&s=10"
            }
            alt="Profile"
            className="h-20 w-20 rounded-full"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold dark:text-white">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-slate-500">
              {user.email}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Upload profile image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            icon={<FiUser />}
          />

          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            icon={<FiUser />}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            icon={<FiMail />}
          />

          <Input
            label="Phone"
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            icon={<FiPhone />}
          />
        </div>

      </div>

      {/* Preferences */}

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-800">

        <h2 className="mb-6 text-xl font-semibold dark:text-white">
          Preferences
        </h2>

        <div className="space-y-6">

          {/* Theme */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              {theme === "light" ? (
                <FiSun size={22} />
              ) : (
                <FiMoon size={22} />
              )}

              <span className="font-medium dark:text-white">
                Dark Mode
              </span>

            </div>

            <button
              onClick={toggleTheme}
              className={`h-7 w-14 rounded-full transition ${
                theme === "dark"
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full bg-white transition ${
                  theme === "dark"
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>

          {/* Notifications */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <FiBell size={22} />

              <span className="font-medium dark:text-white">
                Notifications
              </span>

            </div>

            <button
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`h-7 w-14 rounded-full transition ${
                notifications
                  ? "bg-green-600"
                  : "bg-slate-300"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full bg-white transition ${
                  notifications
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>

        </div>

      </div>

      {/* Save Button */}

      <div className="max-w-xs">
        <Button type="button" variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </div>

    </div>
  );
};

export default Settings;