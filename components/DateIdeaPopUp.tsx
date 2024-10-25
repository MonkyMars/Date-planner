import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Popup.module.scss"; // Custom styles for the popup

const DateIdeaPopup = ({ setVisible, onAddEvents }) => {
  const dateIdeas = ["Samen koken", "Eindhoven", "Film kijken", "All-nighter"]; // Example date ideas
  const [selected, setSelected] = useState<number[]>([]);
  const [date, setDate] = useState<string[]>([]); // Ensure it's an array of strings
  const [customIdea, setCustomIdea] = useState<string>(""); // State for the custom date idea

  const handleSelect = (index: number) => {
    setSelected((prevSelected) => {
      const newSelected = prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index];

      // Update date to include selected ideas and any existing custom ideas
      const newDate = [
        ...newSelected.map((i) => dateIdeas[i]),
        ...date.filter((idea) => !dateIdeas.includes(idea)), // Include existing custom ideas
      ];

      setDate(newDate);
      return newSelected;
    });
  };

  const handleCustomIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomIdea(e.target.value);
  };

  const handleAddCustomIdea = () => {
    if (customIdea) {
      setDate((prevDates) => [...prevDates, customIdea]);
      setCustomIdea("");
    }
  };

  const handleSubmit = () => {
    onAddEvents(date); // Call the function passed from the Home component
    setVisible(false); // Optionally close the popup after submission
  };

  const removeDate = (index: number) => {
    setDate((prevDates) => prevDates.filter((_, i) => i !== index));
    setSelected((prevDates) => prevDates.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <>
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <h2>Pick a Date Idea</h2>
          <ul>
            {dateIdeas.map((idea, index) => (
              <div
                key={index}
                className={styles.dateIdeaItem}
                onClick={() => handleSelect(index)}
              >
                <span
                  className={styles.selectionIndicator}
                  style={{
                    backgroundColor: selected.includes(index)
                      ? "#fdc91c"
                      : "transparent",
                  }}
                ></span>
                <li>{idea}</li>
              </div>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Custom date idea"
            className={styles.inputField}
            value={customIdea}
            onChange={handleCustomIdeaChange}
          />
          <div>
            <button
              onClick={handleAddCustomIdea}
              className={styles.buttonSubmit}
            >
              {"Add Idea"}
            </button>
            <button onClick={handleSubmit} className={styles.buttonSubmit}>
              {"Submit Ideas"}
            </button>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setVisible(false)}
          >
            Close
          </button>
          {date.length > 0 && (
            <>
              <code>Selected date ideas:</code>
              <ul>
                {date.map((idea, index) => (
                  <div key={index} onClick={() => removeDate(index)}>
                    <span style={{ backgroundColor: '#EA3323', border: 'none', fontSize: '1em', padding: '.2em', cursor: 'pointer' }}>X</span>
                    <li>{idea}</li>
                  </div>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DateIdeaPopup;
