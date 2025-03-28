
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>      
      <div  style={{ overflow: "scroll" }} className=" m-auto">
        <Outlet />
      </div>
    </>
  );
}
