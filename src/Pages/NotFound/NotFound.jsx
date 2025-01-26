import { useLocation } from "react-router-dom";
import style from "./NotFound.module.css";
import not_found_img from "../../Images/not-found.webp";

export default function NotFound(props) {
  let location = useLocation();
  return (
    <div id={style.not_found}>
      <img
        id={style.not_found_img}
        src={not_found_img}
        alt="Not Found Image"
        title="Not Found Image"
      />
      <div id={style.not_found_content}>
        <h2>Route Not Found</h2>
        <p>({location.pathname})</p>
      </div>
    </div>
  );
}
