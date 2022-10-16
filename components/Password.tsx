import { useState } from "react";

const Password = ({ isDisabled }: { isDisabled: boolean }) => {
  const [show, setShow] = useState(false);

  const togglePassword = () => {
    setShow((prevState) => !prevState);
  };
  return (
    <>
      <input
        className="py-2 px-8 border border-borderClr w-full rounded-lg focus:outline-none"
        type={show ? "text" : "password"}
        name="password"
        required
        disabled={isDisabled}
        id="password"
        title="Must be at least 8 characters"
        pattern="[a-zA-Z0-9]{8,}"
        placeholder="Password"
      />
      <img
        src={show ? "/eye.svg" : "eye-slash.svg"}
        className="w-[1.25rem] fill-secondary absolute inset-y-0 right-2 block my-auto cursor-pointer"
        onClick={togglePassword}
        alt=""
      />
    </>
  );
};

export default Password;
