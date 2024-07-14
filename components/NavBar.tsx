import { NavBarProps, LinkButtonProps } from "@/types";
import LinkButton from "./LinkButton";

export default function NavBar({
  title,
  href,
  nbuttons,
  linkbuttons = [],
}: NavBarProps) {
  return (
    <main>
    <nav className="w-64 bg-white dark:bg-gray-100 shadow-md p-4 rounded-r-2xl">
      <p className="text-sm font-light text-gray-600 dark:text-gray-600">
        <LinkButton
          title={title}
          href={href}
          style="pl-5 font-medium text-primary-600 hover:underline dark:text-primary-500"
        />
      </p>
      <ul className="mt-8">
        {linkbuttons
          .slice(0, nbuttons)
          .map((button: LinkButtonProps, index: number) => (
            <li key={index} className="mb-4">
              <LinkButton
                href={button.href}
                style="w-48 py-2.5 px-10 ml-2 text-md font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-red-700 dark:bg-red-600 dark:text-white dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700"
                title={button.title}
              />
            </li>
          ))}
      </ul>
    </nav>


    </main>
  );
}