import { Outlet } from "react-router-dom";
import SideBar from "@/components/Sidebar/Sidebar"; // Import Sidebar component
import { CommonToggle } from "@/components/Toggles/CommonToggle";

export default function Root() {
    const showSideBarToggle = (checked:boolean) => {
      if(checked){
        document.getElementById("sidebar")!.style.display = "block";

      }else{
        document.getElementById("sidebar")!.style.display = "none";
      }
    }
    return (
        <>
            <div id="sidebar">
                {/* <div id="sidebar" className={styles.sidebar}> */}

                {/* <h1>Use React Router</h1> */}

                {/* <SearchBar /> */}
                <SideBar />
            </div>

            <div id="detail" style={{ overflow: "scroll" }}>
                <div className="absolute top-2 left-2 z-100" id="showSideBarToggle">
                    <CommonToggle
                        handleChange={(event, checked) => {
                            showSideBarToggle(checked);
                        }}
                        labelContent="显示侧边栏"
                        tipContent="点击用于切换显示/隐藏侧边栏"
                        positionClass="top-2 left-2 fixed "                        
                    />
                </div>

                <Outlet />
            </div>
        </>
    );
}
