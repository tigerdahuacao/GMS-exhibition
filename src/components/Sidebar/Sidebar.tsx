import { Link } from "react-router-dom";
import defaultNavItems from "./defaultNavItems";

import classNames from "classnames";

// define a NavItem prop
export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

// add NavItem prop to component prop
//   type Props = {
//     open: boolean;
//     navItems?: NavItem[];
//     setOpen(open: boolean): void;
//   };
const Sidebar = () => {
    return (
        <nav>
            <ul>
                {defaultNavItems.map((item: NavItem, index: number) => {
                    return (
                        <Link key={index} to={item.href}>
                            {/* <li
                className={classNames({
                  "text-indigo-100 hover:bg-indigo-900": true, //colors
                  "flex gap-4 items-center ": true, //layout
                  "transition-colors duration-300": true, //animation
                  "rounded-md p-2 mx-2": true, //self style
                })}
              > */}
                            <li>
                                {item.icon} {item.label}
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Sidebar;
