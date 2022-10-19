import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]";

const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>

      <section className="w-11/12 self-start md:self-center">
        <div className="text-center mb-7">
          <h1 className="text-2xl md:text-4xl">Personal info</h1>
          <span>Basic info, like your name and photo</span>
        </div>
        <div className="mx-auto max-w-[845px] md:border md:dark:border-darkPrimary rounded-2xl">
          <div className="mt-5 md:mt-0 md:px-12 md:py-9 flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl">Profile</h2>
              <span className="block w-44 sm:w-full text-xs md:text-lg">
                Some info may be visible to other people
              </span>
            </div>
            <button className="w-24 py-2 border border-borderClr rounded-xl">
              Edit
            </button>
          </div>
          {session && session.user ? (
            <>
              <div className="mt-5 md:mt-0 md:px-12 md:py-5 grid grid-cols-2 md:border-t-[1px]">
                <span className="uppercase md:text-lg flex items-center">
                  Photo
                </span>

                <img
                  src={session.user.image as string}
                  height={72}
                  width={72}
                  alt="profile pic"
                  className="rounded-lg"
                />
              </div>

              <div className="mt-5 md:mt-0 md:px-12 md:py-9 grid grid-cols-2 md:border-t-[1px]">
                <span className="uppercase md:text-lg">Name</span>
                <span className="sm:text-lg">{session.user.name}</span>
              </div>
              <div className="mt-5 md:mt-0 md:px-12 md:py-9 grid grid-cols-2 md:border-t-[1px]">
                <span className="uppercase md:text-lg">Bio</span>
                <span className="sm:text-lg">{session.user.bio}</span>
              </div>
              <div className="mt-5 md:mt-0 md:px-12 md:py-9 grid grid-cols-2 md:border-t-[1px]">
                <span className="uppercase md:text-lg">Phone</span>
                <span className="sm:text-lg">{session.user.phone}</span>
              </div>
              <div className="mt-5 md:mt-0 md:px-12 md:py-9 grid grid-cols-2 md:border-t-[1px]">
                <span className="uppercase md:text-lg">Email</span>
                <span className="sm:text-lg">{session.user.email}</span>
              </div>
              <div className="mt-5 md:mt-0 md:px-12 md:py-9 grid grid-cols-2 md:border-t-[1px]">
                <span className="uppercase md:text-lg">Password</span>
                <span className="flex items-center">
                  {session.user.password && session.user.password.length > 0
                    ? "********"
                    : ""}
                </span>
              </div>
            </>
          ) : (
            <h2>No User Found!</h2>
          )}
        </div>
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

export default Home;
