import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Auth</title>
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  );
};

export default Home;
