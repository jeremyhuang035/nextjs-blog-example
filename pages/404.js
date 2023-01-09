import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="container box-border h-screen flex flex-col justify-evenly items-center">
      <h1 className="text-7xl">Oops!</h1>
      <p className="text-gray-500 text-2xl">404 - Page Not Found</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default Custom404;
