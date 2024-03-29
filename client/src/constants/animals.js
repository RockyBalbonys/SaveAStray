import felixImage from "../assets/images/animals/felix.jpg";
import inibamImage from "../assets/images/animals/inibam.jpg";
import jembotImage from "../assets/images/animals/jembot.jpg";
import lansImage from "../assets/images/animals/lans.jpg";
import pugdoyImage from "../assets/images/animals/pugdoy.jpg";
import ramboImage from "../assets/images/animals/rambo.jpg";

const animalProps = [
  {
    id: 1,
    propType: "Pet Type",
    options: ["Dog", "Cat"],
  },
  {
    id: 2,
    propType: "Breed",
    options: [],
  },
  {
    id: 3,
    propType: "Sex",
    options: ["Male", "Female"],
  },
  {
    id: 4,
    propType: "Age",
    options: ["Young", "Adolescent", "Adult", "Senior"],
  },
  {
    id: 5,
    propType: "Color",
    options: [],
  },
  {
    id: 6,
    propType: "Size",
    options: ["Small", "Medium", "Large", "Giant"],
  },
  {
    id: 7,
    propType: "Status",
    options: ["Available", "In Process", "Adopted"],
  },
];

const filteredOptions = [
  { propType: "Pet Type", options: ["Dog", "Cat"] },
  { propType: "Sex", options: ["Male", "Female"] },
  { propType: "Age", options: ["Young", "Adolescent", "Adult", "Senior"] },
  { propType: "Size", options: ["Small", "Medium", "Large", "Giant"] },
  { propType: "Status", options: ["Available", "In Process", "Adopted"] },
];

const defaultAnimalData = {
  // Define default animal data
  name: "",
  description: "",
  species: "",
  breed: "",
  sex: "",
  age: "",
  color: "",
  size: "",
};

const defaultUploadedImages = [];

export {
  animalProps,
  filteredOptions,
  defaultAnimalData,
  defaultUploadedImages,
};
