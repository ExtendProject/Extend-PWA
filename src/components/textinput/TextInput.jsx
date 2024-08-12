import React, { useState } from "react";
import styles from "./TextInput.module.css";
import { RiArrowDownSLine } from "react-icons/ri";
// import useModal from "../modal/modal";
// import { TextInputProps } from "@/interfaces/interface";


const TextInput = ({ ...props }) => {


  // This add more padding left to the text input to make the phone number visible


  return (
    <div>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.wrapper}>
     
        <input
          className={styles.input}
          style={{
            width: props.width,
            height: props.height,
            // paddingLeft: props.name === "phone_number" ? contryCodePadding : 15,
          }}
          {...props}
          type={props.showPassword == true ? "text" : props.type}
        />
      </div>
    </div>
  );
};

export default TextInput;
