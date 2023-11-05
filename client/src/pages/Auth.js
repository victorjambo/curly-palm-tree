import { useEffect, useState } from "react";
import { useAppContext } from "../context/app.provider";
import { AuthType, useAuthContext } from "../context/auth.provider";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/accounts";
import { Navigate } from "react-router-dom";

function Auth() {
  const { authType, setIsAuth, setUser, isAuth, setAuthType } = useAuthContext();
  const { handleToast } = useAppContext();

  const [disabled, setDisabled] = useState(false);
  const [errors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [username, setUsername] = useState("mutai");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (loading) return;
    if (data?.login?.success) {
      const currentUser = data.login.user;
      handleToast?.("Successfully logged in", "SUCCESS");
      localStorage.setItem("chat.token", data.login.accessToken);
      localStorage.setItem("chat.user", JSON.stringify(currentUser));
      setIsAuth?.(true);
      setUser?.(currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (error) {
      handleToast("Error logging in", "WARN");
      console.warn(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  useEffect(() => {
    if (
      (authType === AuthType.Signup &&
        (!password || !confirmPassword || !username)) ||
      (authType === AuthType.Login && (!password || !username))
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [authType, confirmPassword, password, username]);

  const handleAuth = async () => {
    if (authType === AuthType.Login) {
      const variables = {
        username,
        password,
      };
      await login({
        variables,
      });
    }
  };

  return (
    <>
    {isAuth ? <Navigate to="/" replace={true} /> : null}
    <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-60 transition-opacity">
      <div className="align-middle h-fit mx-auto inline-block max-h-screen bg-[#262833] rounded-2xl text-left shadow-xl transform transition-all overflow-hidden p-2 sm:p-6 w-96">
        <div className="font-semibold text-xl text-white leading-8 my-4">
          {authType}
        </div>
        <div className="text-white overflow-x-scroll mx-auto mb-4 ">
          <div className="flex flex-col w-full space-y-4 p-1">
            <div className="flex flex-col w-full">
              <label htmlFor="username">Username</label>
              <div className="col-span-3">
                <input
                  id="username"
                  name="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username..."
                  type="text"
                  className={`w-full px-4 py-2 border bg-transparent focus-visible:outline-none focus:ring-1 focus:ring-[#2563eb] rounded-md ${
                    errors.username ? "border-[#fe5c4c]" : "border-[#3e3f4b]"
                  }`}
                />
                {errors.username ? (
                  <span className="text-[#fe5c4c] text-xs">
                    {errors.username}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
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
                {errors.password ? (
                  <span className="text-[#fe5c4c] text-xs">
                    {errors.password}
                  </span>
                ) : null}
              </div>
            </div>

            {authType === AuthType.Signup ? (
              <div className="flex flex-col w-full">
                <label htmlFor="confirm-password">Confirm Password</label>
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
                  {errors.confirmPassword ? (
                    <span className="text-[#fe5c4c] text-xs">
                      {errors.confirmPassword}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col w-full pt-6">
              <button
                className={`transition text-sm px-5 py-2 rounded-lg border flex items-center justify-center text-center w-full ${
                  disabled || loading
                    ? "border-[#3e3f4b] bg-[#3e3f4b] text-[#6a6d7c] cursor-not-allowed"
                    : "cursor-pointer border-[#4f87f6] bg-[#4f87f6] hover:border-[#1859f1] hover:bg-[#1859f1] text-white"
                }`}
                disabled={disabled || loading}
                onClick={handleAuth}
              >
                {loading ? (
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
                ) : null}
                <span>{loading ? "Loading" : authType}</span>
              </button>
            </div>

            <div className="flex flex-col w-full pt-2">
              <button
                className="self-end text-blue-400 underline"
                onClick={() =>
                  setAuthType(
                    authType === AuthType.Login
                      ? AuthType.Signup
                      : AuthType.Login
                  )
                }
              >
                {authType === AuthType.Login
                  ? "create account"
                  : "switch to login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Auth;