import { useState, useEffect } from "react";

const useScroll = (scrollThreshold = 200) => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowButton(scrollY > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return showButton;
};

export default useScroll;
