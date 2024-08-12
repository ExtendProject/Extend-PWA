import React, { useState } from "react";
import styles from "./page.module.css";
import TextInput from "../textinput/TextInput";
import { RiSendPlaneFill, RiImageAddFill } from "react-icons/ri";
import logo from "../../../public/assets/images/extend.png";
import Image from "next/image";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import axios from "axios";

Modal.setAppElement("#__next"); // This is necessary for accessibility reasons

function Part1() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [prompt, setPrompt] = useState("");

  // const data = {
  //   budget: 20000,
  //   final_remarks:
  //     "The provided image does not show any existing building structure. Therefore, I will focus on general sustainability recommendations and budget allocation for a 3-bedroom apartment construction on a 1-acre land.  ",
  //   results: [
  //     {
  //       materials_objects_tools: "Foundation",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Rammed earth foundation or recycled concrete aggregate foundation",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Concrete Block",
  //           price: 124.77,
  //           description: "Ensures excellent thermal insulation.",
  //         },
  //         {
  //           name: "Concrete Block",
  //           price: 270.15,
  //           description: "Perfect for residential and commercial projects.",
  //         },
  //         {
  //           name: "Concrete Block",
  //           price: 487.46,
  //           description: "Available in various sizes and colors.",
  //         },
  //       ],
  //       cost_efficient: "Yes",
  //       notes:
  //         "Rammed earth foundation is a natural, cost-effective and sustainable option that utilizes readily available materials.",
  //       budget_allocation: "20%",
  //       recommendations:
  //         "Consider using rammed earth or recycled concrete aggregate for the foundation. It's more sustainable and can reduce material costs.",
  //     },
  //     {
  //       materials_objects_tools: "Framing",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Timber framing from sustainably harvested forests or recycled wood",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Wood Plank",
  //           price: 426.98,
  //           description: "Perfect for residential and commercial projects.",
  //         },
  //         {
  //           name: "Wood Plank",
  //           price: 464.47,
  //           description: "Available in various sizes and colors.",
  //         },
  //         {
  //           name: "Wood Plank",
  //           price: 120.44,
  //           description: "Perfect for residential and commercial projects.",
  //         },
  //         {
  //           name: "Wood Plank",
  //           price: 341.31,
  //           description: "Provides a smooth and glossy finish.",
  //         },
  //       ],
  //       cost_efficient: "Yes",
  //       notes:
  //         "Timber framing is a durable option with low embodied energy. Ensure timber is sourced responsibly.",
  //       budget_allocation: "25%",
  //       recommendations:
  //         "Choose sustainably sourced timber framing.  Consider using recycled wood as well.",
  //     },
  //     {
  //       materials_objects_tools: "Insulation",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Natural insulation materials like cellulose, sheep wool, or hemp",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Insulation Foam",
  //           price: 49.18,
  //           description: "Complies with industry standards.",
  //         },
  //         {
  //           name: "Insulation Foam",
  //           price: 202.63,
  //           description: "Provides a smooth and glossy finish.",
  //         },
  //         {
  //           name: "Insulation Foam",
  //           price: 243.93,
  //           description: "Offers superior strength and stability.",
  //         },
  //       ],
  //       cost_efficient: "Yes",
  //       notes:
  //         "Natural insulation is more environmentally friendly and can improve indoor air quality.",
  //       budget_allocation: "10%",
  //       recommendations:
  //         "Use natural insulation materials like cellulose, sheep wool, or hemp to improve energy efficiency and create a healthier living space.",
  //     },
  //     {
  //       materials_objects_tools: "Roofing",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Green roof, solar panels, or recycled roofing materials",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Roof Tile",
  //           price: 232.42,
  //           description: "Designed for easy application and maintenance.",
  //         },
  //         {
  //           name: "Roof Tile",
  //           price: 403.72,
  //           description: "Weather-resistant and easy to install.",
  //         },
  //         {
  //           name: "Roof Tile",
  //           price: 192.32,
  //           description: "Provides a smooth and glossy finish.",
  //         },
  //         {
  //           name: "Asphalt Shingle",
  //           price: 382.08,
  //           description: "Perfect for residential and commercial projects.",
  //         },
  //       ],
  //       cost_efficient: "No",
  //       notes:
  //         "A green roof can help reduce energy consumption and improve water management. Solar panels can generate clean energy.",
  //       budget_allocation: "15%",
  //       recommendations:
  //         "Consider a green roof or solar panels to further enhance sustainability. If you have a limited budget, consider recycled roofing materials.",
  //     },
  //     {
  //       materials_objects_tools: "Windows and Doors",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Energy-efficient windows and doors with low-e glass and recycled content",
  //       found_alternatives_from_market: [],
  //       cost_efficient: "No",
  //       notes:
  //         "Energy-efficient windows and doors can significantly reduce energy loss and improve comfort.",
  //       budget_allocation: "10%",
  //       recommendations:
  //         "Invest in energy-efficient windows and doors with low-e glass and recycled content to reduce energy costs and improve sustainability.",
  //     },
  //     {
  //       materials_objects_tools: "Interior Finishes",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Natural and non-toxic paints, finishes, and flooring materials like bamboo or cork",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Floor Tile",
  //           price: 83.56,
  //           description: "Available in various sizes and colors.",
  //         },
  //         {
  //           name: "Floor Tile",
  //           price: 131.03,
  //           description: "High-performance product.",
  //         },
  //         {
  //           name: "Laminate Flooring",
  //           price: 477.65,
  //           description: "Innovative design for enhanced efficiency.",
  //         },
  //       ],
  //       cost_efficient: "Yes",
  //       notes:
  //         "Natural and non-toxic materials improve indoor air quality and contribute to a healthier home.",
  //       budget_allocation: "10%",
  //       recommendations:
  //         "Choose natural and non-toxic paints, finishes, and flooring materials like bamboo or cork for a healthier living space.",
  //     },
  //     {
  //       materials_objects_tools: "Plumbing",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative:
  //         "Low-flow fixtures and water-efficient appliances",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Water Heater",
  //           price: 350.81,
  //           description: "Designed for easy application and maintenance.",
  //         },
  //         {
  //           name: "Faucet",
  //           price: 379.12,
  //           description: "Compact design for tight spaces.",
  //         },
  //         {
  //           name: "Faucet",
  //           price: 391.29,
  //           description: "Ensures excellent thermal insulation.",
  //         },
  //       ],
  //       cost_efficient: "Yes",
  //       notes:
  //         "Low-flow fixtures and water-efficient appliances can significantly reduce water consumption and save money on utility bills.",
  //       budget_allocation: "5%",
  //       recommendations:
  //         "Install low-flow fixtures and water-efficient appliances to conserve water and reduce environmental impact.",
  //     },
  //     {
  //       materials_objects_tools: "Electrical",
  //       observed_in_images: "Not Applicable",
  //       sustainable_alternative: "Energy-efficient lighting and appliances",
  //       found_alternatives_from_market: [
  //         {
  //           name: "Switch",
  //           price: 129.84,
  //           description: "Eco-friendly and sustainable.",
  //         },
  //         {
  //           name: "Switch",
  //           price: 490.16,
  //           description: "Weather-resistant and easy to install.",
  //         },
  //         {
  //           name: "Switch",
  //           price: 490.16,
  //           description: "Weather-resistant and easy to install.",
  //         },
  //       ],
  //       cost_efficient: "Yes",
  //       notes:
  //         "Energy-efficient lighting and appliances can reduce electricity consumption and save money on utility bills.",
  //       budget_allocation: "5%",
  //       recommendations:
  //         "Use energy-efficient lighting and appliances to reduce your electricity consumption.",
  //     },
  //   ],
  //   total_estimated_spendings: 15000,
  //   remaining_amount_form_budget: 5000,
  //   user_name: "Not Applicable",
  // };

  const handleFileChange = (event) => {
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

  // const handleSendClick = () => {
  //   setLoading(true);

  //   // Simulate a request with a timeout
  //   setTimeout(() => {
  //     setLoading(false);
  //     alert("Request processed successfully!");
  //   }, 10000); // 1 minute simulation
  // };

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
      let endpoint = "https://227f-139-162-113-228.ngrok-free.app";
      const response = await axios.post(`${endpoint}/analyze`, formData, {
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
            {/* <p>
              <strong>Market Alternatives:</strong>{" "}
              {item.found_alternatives_from_market}
            </p> */}
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
        <div>
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
        <div onClick={handleUpload} style={{ cursor: "pointer" }}>
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
