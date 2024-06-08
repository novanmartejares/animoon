import "./page.css";
import errorP from '../../../public/error.gif'
import Image from "next/image";
export default function Error() {
  return (
    <div
      style={{ marginTop: "65px" }}
      className="gogoanime-error d-flex-fd-column a-center j-center"
    >
      <Image className="imago" src={errorP} alt="error"/>
      <h2 className="hji">Page is under Construction ...</h2>
    </div>
  );
}