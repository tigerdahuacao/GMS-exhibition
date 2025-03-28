import classNames from "classnames";
import { FC, ReactNode } from "react";

// 定义 props 接口
interface MyPanelProps {
    children: ReactNode | undefined;
}
const MyPanel: FC<MyPanelProps> = (props) => {
    // const MyPanel: FC<childProps> = ({slot}) => {
    return (
        <div
            className={classNames({
                "relative bg-white px-6 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto  sm:rounded-lg sm:px-10 ":
                    true,
                "pt-6": true,
                "sm:max-w-3xl": false,
            })}
        >
            {props.children}
        </div>
    );
};

export default MyPanel;
