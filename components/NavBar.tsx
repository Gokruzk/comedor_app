import { NavBarProps, LinkButtonProps } from "@/types";
import LinkButton from "./LinkButton";

export default function NavBar({
  title,
  href,
  nbuttons,
  linkbuttons = [],
}: NavBarProps) {
  return (
    <nav className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen p-4">
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        <LinkButton
          title={title}
          href={href}
          style="font-medium text-primary-600 hover:underline dark:text-primary-500"
        />
      </p>
      <ul className="mt-8">
        {linkbuttons
          .slice(0, nbuttons)
          .map((button: LinkButtonProps, index: number) => (
            <li key={index} className="mb-4">
              <LinkButton
                href={button.href}
                style="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                title={button.title}
              />
            </li>
          ))}
      </ul>
    </nav>
  );
}