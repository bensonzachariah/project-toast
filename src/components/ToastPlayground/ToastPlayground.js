import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { toasts, addToast } = React.useContext(ToastContext);
  console.log(toasts);
  const [message, setMessage] = React.useState("");
  const [variantType, setVariantType] = React.useState(VARIANT_OPTIONS[0]);

  const messageRef = React.useRef();
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          addToast(message, variantType);
          setMessage("");
          setVariantType(VARIANT_OPTIONS[0]);
          messageRef.current.focus();
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              ref={messageRef}
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => {
              return (
                <label htmlFor={`variant-${variant}`} key={variant}>
                  <input
                    id={`variant-${variant}`}
                    type='radio'
                    name='variant'
                    checked={variantType === variant}
                    value={variant}
                    onChange={(e) => setVariantType(e.target.value)}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
