import React, { useState } from "react";
import styles from "../styles/Popup.module.scss";

interface DateIdeaPopupProps {
  setVisible: (visible: boolean) => void;
  onAddEvents: (dateIdeas: { idea: string; date: string | null }[]) => void;
}

const DateIdeaPopup: React.FC<DateIdeaPopupProps> = ({ setVisible, onAddEvents }) => {
  const dateIdeas = ["Samen koken", "Eindhoven", "Film kijken", "All-nighter"];
  const [selected, setSelected] = useState<number[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [customIdea, setCustomIdea] = useState<string>("");
  const [visibleDate, setVisibleDate] = useState<boolean>(false);
  const [datesForIdeas, setDatesForIdeas] = useState<{ [key: string]: string | null }>({});

  const handleSelect = (index: number) => {
    setSelected((prevSelected) => {
      const newSelected = prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index];
      const newDate = [
        ...newSelected.map((i) => dateIdeas[i]),
        ...date.filter((idea) => !dateIdeas.includes(idea)),
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

  const handleDateChange = (idea: string, newDate: string) => {
    setDatesForIdeas((prevDates) => ({
      ...prevDates,
      [idea]: newDate,
    }));
  };

  const handleSubmit = () => {
    const selectedEvents = date.map((idea) => ({
      idea,
      date: datesForIdeas[idea] || null,
    }));
    onAddEvents(selectedEvents);
    setVisible(false);
  };

  const removeDate = (index: number) => {
    const ideaToRemove = date[index];
    setDate((prevDates) => prevDates.filter((_, i) => i !== index));
    setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
    setDatesForIdeas((prevDates) => {
      const updatedDates = { ...prevDates };
      delete updatedDates[ideaToRemove];
      return updatedDates;
    });
  };

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
              <ul
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  maxHeight: "150px",
                  maxWidth: "100%",
                }}
              >
                {date.map((idea, index) => (
                  <div key={index}>
                    <div>
                      <span
                        onClick={() => removeDate(index)}
                        style={{
                          backgroundColor: "#EA3323",
                          border: "none",
                          fontSize: "1em",
                          padding: ".2em",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </span>
                      <li onClick={() => setVisibleDate(!visibleDate)}>
                        {idea}
                      </li>
                    </div>
                    <div>
                      <input
                        type="date"
                        style={{
                          height: visibleDate ? "auto" : "-4px",
                          padding: visibleDate ? "1em" : "-4px",
                          opacity: visibleDate ? "1" : "0",
                        }}
                        value={datesForIdeas[idea] || ""}
                        onChange={(e) => handleDateChange(idea, e.target.value)}
                      />
                    </div>
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
