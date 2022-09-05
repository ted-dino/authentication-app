import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center text-lightPrimary dark:text-darkPrimary">
      created by{" "}
      <Link href="https://github.com/ted-dino">
        <a className="font-bold">Ted Dino</a>
      </Link>{" "}
      - devChallenge.io
    </footer>
  );
};

export default Footer;
