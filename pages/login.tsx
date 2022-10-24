import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Password from "../components/Password";
import { authOptions } from "./api/auth/[...nextauth]";

const Login = () => {
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const credLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const inputObject = Object.fromEntries(formData);
    const { email, password } = inputObject;

    const status = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (status && !status.ok) {
      const message = status.error as string;
      setError(message);
    } else {
      router.push("/");
      setError("");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Auth - Login</title>
      </Head>
      <div className="p-12 w-full max-w-[475px] border border-borderClr rounded-3xl">
        <Image
          src={
            theme === "dark"
              ? "/devchallenges-light.svg"
              : "/devchallenges-dark.svg"
          }
          width={100}
          height={20}
        />
        <h1 className="my-5 text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
          Login
        </h1>
        {error && (
          <div className="flex gap-2 my-2 mx-auto p-5 border border-borderClr text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>

            <span className="flex items-center gap-1">{error}</span>
          </div>
        )}

        <form onSubmit={credLogin} className="flex flex-col gap-4">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[1.25rem] fill-secondary absolute inset-y-0 left-2 block my-auto"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>

            <input
              className="py-2 px-8 border border-borderClr w-full rounded-lg focus:outline-none"
              type="email"
              name="email"
              id="email"
              required
              disabled={isLoading}
              placeholder="Email"
              pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
              title="Must be a valid email address"
            />
          </div>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[1.25rem] fill-secondary absolute inset-y-0 left-2 block my-auto"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>

            <Password
              isDisabled={isLoading}
              isRequired={true}
              className="py-2 px-8 border border-borderClr w-full rounded-lg focus:outline-none"
            />
          </div>
          <button
            disabled={isLoading}
            className={`py-2 bg-accent text-white rounded-lg font-semibold ${
              isLoading && "cursor-progress"
            }`}
          >
            Login
          </button>
        </form>
        <div className="mt-5 w-full flex flex-col items-center">
          <small className="text-secondary dark:text-darkPrimary">
            or continue with these social profile
          </small>
          <div className="my-5 flex items-center justify-center gap-5">
            <button onClick={() => signIn("github")}>
              <Image src="/Gihub.svg" width={42} height={42} />
            </button>

            <button onClick={() => signIn("google")}>
              <Image src="/Google.svg" width={42} height={42} />
            </button>
          </div>
          <small className="text-secondary dark:text-darkPrimary">
            Don’t have an account yet?{" "}
            <Link href="/register">
              <a>
                <span className="text-accent">Register</span>
              </a>
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Login;
