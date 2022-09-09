import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>

      <div>
        <h1>
          {session && session.user
            ? `Signed in as ${session.user.email}`
            : "Not signed in"}
        </h1>
        <img src={`${session.user?.image}`} alt="" />
        {session && session.user && (
          <button
            onClick={() =>
              signOut({
                callbackUrl: "http://localhost:3000/",
              })
            }
          >
            Sign out
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
