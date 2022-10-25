import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const Edit = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: session && session.user ? session.user.bio?.toString() : "",
    name: session && session.user ? session.user.name?.toString() : "",
    phone: session && session.user ? session.user.phone : "",
    email: session && session.user ? session.user.email?.toString() : "",
    password: "",
  });

  const submitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const request = await fetch("/api/users/update", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const status = await request.json();

      if (status && status.message) {
        const message = status.error as string;
        alert(message);
      } else {
        router.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Update Error: ${error.message}`);
        return;
      }
      alert(`Unexpected Error: ${error}`);
    }
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Head>
        <title>Auth - Edit Details</title>
      </Head>
      <section className="w-11/12 self-start md:self-center">
        <div className="my-5 mx-auto max-w-[845px] flex items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>

          <Link href="/">
            <a className="hover:underline">Back</a>
          </Link>
        </div>
        {session && session.user ? (
          <div className="mt-5 md:mt-0 md:px-12 md:py-5 mx-auto max-w-[845px] md:border md:dark:border-darkPrimary rounded-2xl">
            <div>
              <h1 className="text-xl md:text-2xl">Change Info</h1>
              <span className="block w-44 sm:w-full text-xs md:text-lg">
                Changes will be reflected to every services
              </span>
            </div>
            <form onSubmit={submitData}>
              <div className="relative my-2 flex items-center gap-5">
                <img
                  src={session.user.image as string}
                  width={72}
                  height={72}
                  alt="some idiot guy"
                  className="rounded-lg"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="my-2 md:my-7 flex flex-col">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={onChange}
                  className="p-2 border border-borderClr w-full max-w-[420px] rounded-lg focus:outline-none"
                />
              </div>
              <div className="my-2 md:my-7 flex flex-col">
                <label htmlFor="bio" className="text-sm">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  cols={10}
                  rows={6}
                  value={formData.bio}
                  className="p-2 border border-borderClr w-full max-w-[420px] min-h-[90px]  max-h-[120px] rounded-lg focus:outline-none"
                  onChange={onChange}
                />
              </div>
              <div className="my-2 md:my-7 flex flex-col">
                <label htmlFor="phone" className="text-sm">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  onChange={onChange}
                  value={formData.phone}
                  className="p-2 border border-borderClr w-full max-w-[420px] rounded-lg focus:outline-none"
                />
              </div>
              <div className="my-2 md:my-7 flex flex-col">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  className="p-2 border border-borderClr w-full max-w-[420px] rounded-lg focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  value={formData.email}
                  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  title="Must be a valid email address"
                />
              </div>
              <div className="my-2 md:my-7 flex flex-col w-full max-w-[420px]">
                <label htmlFor="password" className="text-sm">
                  New Password
                </label>
                <div className="relative">
                  <input
                    className="p-2 border border-borderClr w-full rounded-lg focus:outline-none"
                    type="password"
                    name="password"
                    id="password"
                    onChange={onChange}
                    value={formData.password}
                    title="Must be at least 8 characters"
                    pattern="[a-zA-Z0-9]{8,}"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button className="py-2 px-6 bg-[#f26352] text-white dark:bg-accent rounded-lg">
                Save
              </button>
            </form>
          </div>
        ) : (
          <h1>
            Something went wrong! Message the stupid developer if you will.
          </h1>
        )}
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Edit;
