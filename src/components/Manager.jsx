import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCopy,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
// React Toastify Container
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", username: "", password: "" });
      toast("Password saved!", {
        autoClose: 1000,
      });
    }
    else{
      toast("Error: Password not saved (Invalid length)!", {
        autoClose: 1000,
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    let newPasswords = passwordArray.filter((item) => {
      return item.id !== id;
    });
    setPasswordArray(newPasswords);
  };

  const deletePassword = (id) => {
    let newPasswords = passwordArray.filter((item) => {
      return item.id !== id;
    });
    setPasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    toast("Password deleted!", {
      autoClose: 1000,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
    } else {
      inputRef.current.type = "password";
    }
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
      autoClose: 1000,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 w-full bg-white"></div>
      <div className="md:mycontainer text-[#2C2C2C] px-4 pb-8 min-h-[84vh]">
        <h1 className="text-3xl text-center font-bold">PassSecure</h1>
        <p className="text-lg text-center">Manage your passwords with ease.</p>
        <div className="flex flex-col p-4 gap-4 items-center">
          <input
            type="text"
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-[#4682B4] px-4 py-1 w-full"
            placeholder="Enter website"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              className="border border-[#4682B4] rounded-full w-full px-3 py-1"
              type="text"
              placeholder="Username"
              name="username"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
                ref={inputRef}
                className="border border-[#4682B4] rounded-full w-full px-3 py-1"
                type="password"
                placeholder="Password"
                name="password"
              />
              <span
                onClick={togglePassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-[#4682B4] rounded-full px-4 py-2 w-fit gap-1 h-[42px] hover:bg-[#4f7ea5] hover:border-[4px] border-[#4682B4] text-lg"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden text-[#2C2C2C] bg-[#4682B4]">
              <thead className="">
                <tr>
                  <th className="py-2 border border-white">Site URL</th>
                  <th className="py-2 border border-white">Username</th>
                  <th className="py-2 border border-white">Password</th>
                  <th className="py-2 border border-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => {
                  return (
                    <tr className="" key={item.id}>
                      <td className="py-2 text-center border border-white w-32">
                        <a href="{item.site}" target="_blank">
                          {item.site}
                        </a>
                      </td>
                      <td className="py-2 text-center border border-white w-32">
                        {item.username}
                        <FontAwesomeIcon
                          className="cursor-pointer pl-2 hover:text-[#585757]"
                          onClick={() => {
                            copyText(item.username);
                          }}
                          icon={faCopy}
                        />
                      </td>
                      <td className="py-2 text-center border border-white w-32">
                        {item.password}
                        <FontAwesomeIcon
                          className="cursor-pointer pl-2 hover:text-[#585757]"
                          onClick={() => {
                            copyText(item.password);
                          }}
                          icon={faCopy}
                        />
                      </td>
                      <td className="py-2 text-center border border-white w-32">
                        <div className="flex items-center justify-center gap-1">
                          <span
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              className="text-xl w-10 hover:text-[24px] hover:text-[#585757]"
                              icon={faPenToSquare}
                            />
                          </span>
                          <span
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: 25, height: 25 }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
