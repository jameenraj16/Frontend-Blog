import React from "react";

const Missing = () => {
  return (
    <div style={styles.notFoundContainer}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

const styles = {
  notFoundContainer: {
    textAlign: "center",
    marginTop: "50px",
  },
  heading: {
    color: "#f00", // Red color for the heading
  },
  text: {
    color: "#333", // Dark gray color for the text
    fontSize: "18px",
  },
};

export default Missing;
