import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, LOGIN_AS } from "../graphql/accounts";
import { useAppContext } from "../context/app.provider";
import { useNavigate } from "react-router-dom";


function LoginAs() {
  const { data: usersData } = useQuery(GET_USERS);
  const { setIsAuthenticated, setCurrentUser, handleToast } = useAppContext();
  const [loginAs, { data, loading, error }] = useMutation(LOGIN_AS);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (data?.loginAs?.success) {
      const currentUser = data.loginAs.user;
      handleToast?.("Successfully logged in", "SUCCESS");
      localStorage.setItem("chat-token", data.loginAs.accessToken);
      localStorage.setItem("chat-user", JSON.stringify(currentUser));
      setIsAuthenticated?.(true);
      setCurrentUser?.(currentUser);
      navigate("/")
    }

    if (error) {
      handleToast("Error logging in", "WARN");
      console.warn(error);
    }
  }, [loading]);

  return (
    <div className="absolute top-10 right-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/60 px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Login as
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {usersData?.users
              ? usersData.users.map((user) => (
                  <div className="px-1 py-1" key={user.id}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-slate-200" : ""
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm text-slate-900`}
                          onClick={() => {
                            loginAs({
                              variables: {
                                loginAsId: user.id,
                              },
                            });
                          }}
                        >
                          {user.username}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                ))
              : null}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
export default LoginAs;
