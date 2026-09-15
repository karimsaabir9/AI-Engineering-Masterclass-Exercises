import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
];

function Footer() {
  return (
    <div className="border-t mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-8">
        <div className="flex gap-2 items-center">
          <Image src="/logo.svg" alt="logo" width={24} height={29} />
          <h2 className="font-bold text-lg">AI Trip Planner</h2>
        </div>

        <div className="flex gap-8 items-center">
          {footerLinks.map((link, index) => (
            <Link href={link.path} key={index}>
              <h2 className="text-sm hover:text-primary transition-all">
                {link.name}
              </h2>
            </Link>
          ))}
        </div>

        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} AI Trip Planner. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
