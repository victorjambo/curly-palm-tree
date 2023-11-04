import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { AuthType, useAuthContext } from "../../context/auth.provider";
// import { useAppContext } from "../../context/app.provider";
import { validateAuth } from "../../utils/validator";

const AuthModals = () => {
  const { showModal, setShowModal, authType, /* setIsAuth, setUser, setToken  */} =
    useAuthContext();

  // const { handleToast } = useAppContext();

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      (authType === AuthType.Signup &&
        (!email || !password || !confirmPassword || !name)) ||
      (authType === AuthType.Login && (!email || !password))
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [authType, confirmPassword, email, name, password]);

  const handleAuth = () => {
    setLoading(true);
    if (authType === AuthType.Signup) {
      const { isValid, errors: _errors } = validateAuth(
        email,
        name,
        password,
        confirmPassword
      );
      setErrors(_errors);
      if (!isValid) {
        setLoading(false);
        return;
      }
    }
    submit();
  };

  const submit = async () => {
    // let url = "/auth/login";
    // let data = {
    //   email,
    //   password,
    // };
    // if (authType === AuthType.Signup) {
    //   url = "/auth/signup";
    //   data = {
    //     email,
    //     password,
    //     name,
    //   };
    // }

    // await http
    //   .post(url, data)
    //   .then((res) => res.data)
    //   .then((res) => handleSuccess(res))
    //   .catch((err) => handleErrors(err));
  };

  // const handleSuccess = (res) => {
  //   handleToast?.("Successfully logged in", "SUCCESS");
  //   const user = {
  //     id: res.id,
  //     email: res.email,
  //     name: res.name,
  //   };
  //   setIsAuth?.(true);
  //   setShowModal?.(false);
  //   setLoading(false);
  //   setUser?.(user);
  //   localStorage.setItem("token", JSON.stringify(res.accessToken));
  //   localStorage.setItem("user", JSON.stringify(user));
  //   setToken?.(res.accessToken);
  //   // http.interceptors.request.use(
  //   //   (config) => {
  //   //     config.headers["Authorization"] = `Bearer ${res.accessToken}`;
  //   //     return config;
  //   //   },
  //   //   (error) => {
  //   //     return Promise.reject(error);
  //   //   }
  //   // );
  // };

  // const handleErrors = (error) => {
  //   setLoading(false);
  //   // TODO this is a generic error. we should show what actually went wrong
  //   handleToast?.("Error logging in", "WARN");
  //   console.error(error);
  // };

  const closeModal = () => {
    setShowModal?.(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Modal
      show={!!showModal}
      closeModal={closeModal}
      title={authType}
      width="w-96"
    >
      <div className="flex flex-col w-full space-y-4 p-1">
        {authType === AuthType.Signup && (
          <div className="flex flex-col w-full">
            <label htmlFor="title">Name</label>
            <div className="col-span-3">
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name..."
                className={`w-full px-4 py-2 border bg-transparent focus-visible:outline-none focus:ring-1 focus:ring-[#2563eb] rounded-md ${
                  errors.name ? "border-[#fe5c4c]" : "border-[#3e3f4b]"
                }`}
              />
              {errors.name && (
                <span className="text-[#fe5c4c] text-xs">{errors.name}</span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col w-full">
          <label htmlFor="title">Email</label>
          <div className="col-span-3">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@admin.io"
              className={`w-full px-4 py-2 border bg-transparent focus-visible:outline-none focus:ring-1 focus:ring-[#2563eb] rounded-md ${
                errors.email ? "border-[#fe5c4c]" : "border-[#3e3f4b]"
              }`}
            />
            {errors.email && (
              <span className="text-[#fe5c4c] text-xs">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="title">Password</label>
          <div className="col-span-3">
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              type="password"
              className={`w-full px-4 py-2 border bg-transparent focus-visible:outline-none focus:ring-1 focus:ring-[#2563eb] rounded-md ${
                errors.password ? "border-[#fe5c4c]" : "border-[#3e3f4b]"
              }`}
            />
            {errors.password && (
              <span className="text-[#fe5c4c] text-xs">{errors.password}</span>
            )}
          </div>
        </div>

        {authType === AuthType.Signup && (
          <div className="flex flex-col w-full">
            <label htmlFor="title">Confirm Password</label>
            <div className="col-span-3">
              <input
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password..."
                type="password"
                className={`w-full px-4 py-2 border bg-transparent focus-visible:outline-none focus:ring-1 focus:ring-[#2563eb] rounded-md ${
                  errors.confirmPassword
                    ? "border-[#fe5c4c]"
                    : "border-[#3e3f4b]"
                }`}
              />
              {errors.confirmPassword && (
                <span className="text-[#fe5c4c] text-xs">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="self-center w-2/3 pt-10">
          <button
            className={`transition text-sm px-5 py-2 rounded-lg border flex items-center justify-center text-center w-full ${
              disabled || loading
                ? "border-[#3e3f4b] bg-[#3e3f4b] text-[#6a6d7c] cursor-not-allowed"
                : "cursor-pointer border-[#4f87f6] bg-[#4f87f6] hover:border-[#1859f1] hover:bg-[#1859f1] text-white"
            }`}
            onClick={handleAuth}
            disabled={disabled || loading}
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            <span>{loading ? "Loading" : authType}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModals;