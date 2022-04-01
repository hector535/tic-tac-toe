import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = () => {
  return <div className={classes["backdrop"]}></div>;
};

const Modal = (props) => {
  return <div className={classes["modal"]}>{props.children}</div>;
};

const rootElement = document.getElementById("overlays");

const ModalOverlay = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, rootElement)}
      {ReactDOM.createPortal(<Modal>{props.children}</Modal>, rootElement)}
    </Fragment>
  );
};

export default ModalOverlay;
