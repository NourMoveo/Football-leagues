import "../App.scss";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      {/* Display the dynamic current year */}
      <p>Football App {currentYear}</p>
    </div>
  );
};

export default Footer;
