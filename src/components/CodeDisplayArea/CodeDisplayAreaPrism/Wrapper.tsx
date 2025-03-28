import { FC, useState } from "react";
import classNames from "classnames";
import "@/components/CodeDisplayArea/CodeBlockCSS/scrollBar.css"
import CodeDisplayAreaPrismDisplay from "./PrismDisplay";

const CodeDisplayAreaPrismWrapper: FC = () => {
    return (
        <>
            <div
                className={classNames({
                    "relative bg-white pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10":
                        true,
                    "pt-10": true,    
                    "scroll-bar":true,
                    //高度属性需要根据实际窗口大小来 
                    // https://blog.csdn.net/qq_39877681/article/details/128303484
                    "code-block-height":true               
                })}                
            >
                {/* 这是分割线 */}
                <div className="mx-auto max-w-2xl code-block-max-height">
                    {/* Divide line in each div */}
                    <div className="divide-y divide-gray-300/50">
                        <CodeDisplayAreaPrismDisplay />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CodeDisplayAreaPrismWrapper;
