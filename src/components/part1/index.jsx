import React, { useState } from "react";
import styles from "./page.module.css";
import TextInput from "../textinput/TextInput";
import { RiSendPlaneFill, RiImageAddFill } from "react-icons/ri";
import logo from "../../../public/assets/images/extend.png";
import Image from "next/image";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Config from '../../Config/Config'
Modal.setAppElement("#__next"); // This is necessary for accessibility reasons

function Part1() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [prompt, setPrompt] = useState("");



  const handleFileChange = (event) => {
    event.preventDefault()
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    let validFiles = [...files]; // Copy existing files

    for (let i = 0; i < selectedFiles.length; i++) {
      validFiles.push(selectedFiles[i]);
    }

    setFiles(validFiles);
    console.log("validFiles ", validFiles);
    event.target.value = null; // Clear the input after files are selected
  };



  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select a file");
      return;
    }

    if (prompt === "") {
      alert("Please enter a prompt");
      return;
    }
    const formData = new FormData();

    formData.append("prompts", prompt);
    formData.append("images", ...files);

    setLoading(true);

    try {
      // let endpoint = "https://227f-139-162-113-228.ngrok-free.app";
      const response = await axios.post(`${Config.END_POINT_URL}/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("hey", response.data);
      setData(response.data);
      setPrompt("");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Extend</div>
      {Object.values(data).length === 0 && (
        <div className={styles.imageContainer}>
          {files.map((file, index) => (
            <Image
              key={index}
              src={URL?.createObjectURL(file)}
              alt={`image-${index}`}
              className={styles.image}
              width={130}
              height={130}
            />
          ))}
        </div>
      )}
      {Object.values(data).length === 0 && files.length == 0 && (
        <div className={styles.infomation}>
          <Image src={logo} className={styles.logo} alt="" />
          <h3>Enter your prompt to proceed</h3>
          <h6 className={styles.info}>
            Eg. With a budget of GHS 6,000 how can you help me build a simple
            three bed house on the piece of land i just uploaded
          </h6>
        </div>
      )}
      <section>
        {Object.keys(data).length > 0 && (
          <>
            <h3 id={styles.construction_title}>Construction Budget Overview</h3>
            <div className={styles.budget_summary}>
              <p>
                <strong>Total Budget:</strong> {data.budget} GHS
              </p>
              <p>
                <strong>Total Estimated Spendings:</strong>{" "}
                {data.total_estimated_spendings} GHS
              </p>
              <p>
                <strong>Remaining Budget:</strong>{" "}
                {data.remaining_amount_form_budget} GHS
              </p>
            </div>
          </>
        )}
        {data?.results?.map((item, index) => (
          <div key={index} className={styles.material_item}>
            <h3>Material: {item.materials_objects_tools}</h3>
            <p>
              <strong>Budget Allocation:</strong> {item.budget_allocation}
            </p>
            <p>
              <strong>Cost-Efficient:</strong> {item.cost_efficient}
            </p>
          
            <p>
              <strong>Notes:</strong> {item.notes}
            </p>
            <p>
              <strong>Observed In:</strong> {item.observed_in_images}
            </p>
            <p>
              <strong>Recommendations:</strong> {item.recommendations}
            </p>
            <p>
              <strong>Sustainable Alternatives:</strong>{" "}
              {item.sustainable_alternative}
            </p>
            {item.found_alternatives_from_market.length > 0 && (
              <>
                <h5 className={styles.available}>Available Market Alternatives:</h5>
                <ul>
                  {item.found_alternatives_from_market.map((alt, idx) => (
                    <li key={idx}>
                      <strong className={styles.market_alternate}>
                        {alt.name}:
                      </strong>{" "}
                      {alt.price} GHS - {alt.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </section>
      <br /> <br /> <br /> <br />
      <br />
      <div className={styles.bottom}>
        <div style={{marginTop:10}}>
          <input
            onChange={handleFileChange}
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            id="fileInput"
            style={{ display: "none" }}
          />

          <label
            htmlFor="fileInput"
            className="fileInputLabel"
            style={{ cursor: "pointer" }}
          >
            <RiImageAddFill size={30} />
          </label>
        </div>

        <div className={styles.input_container}>
          <TextInput
            width={"100%"}
            height={43}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
        </div>
        <div onClick={handleUpload} style={{ cursor: "pointer",marginTop:10 }}>
          <RiSendPlaneFill size={30} />
        </div>
      </div>
      {/* Modal for loading */}
      <Modal
        isOpen={loading}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            maxWidth: "300px",
            // fontFamily:"--font-bold"
          },
        }}
      >
        <div className={styles.modalContent}>
          <ClipLoader color={"#36d7b7"} loading={loading} size={50} />
          <p>
            Your request is being processed. <br />
            Please wait, this might take about 1 minute.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Part1;
