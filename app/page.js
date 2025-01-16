"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Block from "./components/Block";
import { fetchBlockSettings, submitBlockData } from "./utils/api";
import { validateSelection } from "./utils/validation";

export default function Home() {
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [blockSettings, setBlockSettings] = useState("single"); // Default to "single"
  const [error, setError] = useState("");

  // Fetch block settings from the backend on initial render
  useEffect(() => {
    const getBlockSettings = async () => {
      const settings = await fetchBlockSettings();
      setBlockSettings(settings.block_settings); 
    };
    getBlockSettings();
  }, []);

  // Handle selection change for blocks
  const handleBlockSelection = (blockTitle) => {
    if (blockSettings === "single") {
      setSelectedBlocks([blockTitle]); // Allow only one block for single setting
    } else {
      setSelectedBlocks((prevSelected) =>
        prevSelected.includes(blockTitle)
          ? prevSelected.filter((title) => title !== blockTitle)
          : [...prevSelected, blockTitle]
      );
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    const validationError = validateSelection(selectedBlocks, blockSettings);
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      await submitBlockData(selectedBlocks); // Submit to backend
      alert('Blocks submitted successfully!');
    }
  };

  const data = [
    {
      title: "Block 1",
      description: "FM Companies",
      type: "groupped",
      icon: "/icons/ico-org.png",
      onClick: () => console.log("Block 1 clicked"),
    },
    {
      title: "Academy",
      type: "groupped",
      icon: "/icons/ico-academy.png",
      onClick: () => console.log("Block 2 clicked"),
    },
    {
      title: "Event Companies",
      description: "Description 3",
      icon: "/icons/ico-event.png",
      type: "groupped",
      onClick: () => console.log("Block 3 clicked"),
    },
    {
      title: "Local Clubs",
      description: "Description 3",
      icon: "/icons/ico-local-club.png",
      type: "groupped",
      onClick: () => console.log("Block 4 clicked"),
    },
    {
      title: "Community Groups",
      description: "Description 3",
      icon: "/icons/ico-org.png",
      type: "groupped",
      onClick: () => console.log("Block 5 clicked"),
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        {data.map((block, index) => (
          <Block
            key={index}
            {...block}
            selected={selectedBlocks.includes(block.title)}
            onCheck={handleBlockSelection}
          />
        ))}
      </div>

      <button
        className={styles.btnMain}
        onClick={handleSubmit}
        disabled={selectedBlocks.length === 0} // Disable button until a block is selected
      >
        Submit
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </main>
  );
}
