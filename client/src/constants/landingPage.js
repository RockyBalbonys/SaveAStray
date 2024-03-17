import home from "../assets/icons/landingIcons/home.svg";
import homeFilled from "../assets/icons/landingIcons/home-filled.svg";
import heart from "../assets/icons/landingIcons/heart.svg";
import heartFilled from "../assets/icons/landingIcons/heart-filled.svg";
import paw from "../assets/icons/landingIcons/paw.svg";
import pawFilled from "../assets/icons/landingIcons/paw-filled.svg";
import adopt from "../assets/icons/landingIcons/helpIcons/adopt.png";
import adopt_filled from "../assets/icons/landingIcons/helpIcons/adopt_filled.png";
import advocate from "../assets/icons/landingIcons/helpIcons/advocate.png";
import advocate_filled from "../assets/icons/landingIcons/helpIcons/advocate_filled.png";
import donate from "../assets/icons/landingIcons/helpIcons/donate.png";
import donate_filled from "../assets/icons/landingIcons/helpIcons/donate_filled.png";
import sponsor from "../assets/icons/landingIcons/helpIcons/sponsor.png";
import sponsor_filled from "../assets/icons/landingIcons/helpIcons/sponsor_filled.png";
import stw from "../assets/icons/landingIcons/helpIcons/stw.png";
import stw_filled from "../assets/icons/landingIcons/helpIcons/stw_filled.png";
import volunteer from "../assets/icons/landingIcons/helpIcons/volunteer.png";
import volunteer_filled from "../assets/icons/landingIcons/helpIcons/volunteer_filled.png";

// Footer and Navbar content links
const pages = ["About", "Animals", "Learn", "Donate", "Contact"];

const legal = ["Terms of Services", "Privacy Policy", "Data Privacy Act"];

const contacts = [
  "University of Caloocan City - North Congress",
  "+63-994-478-639",
  "lyfiesupport@gmail.com",
];

// Content for the card in Hero section
// TODO: add image or icon property in each objects
const cardContent = [
  {
    title: "Save A Life",
    description:
      "By adopting from a local shelter, you are directly pulling an animal at risk of euthanasia.",
    icon: heart,
    iconFilled: heartFilled,
  },
  {
    title: "Support Your Community",
    description:
      "Shelters rely on community support to function and care for their animals.",
    icon: home,
    iconFilled: homeFilled,
  },
  {
    title: "Discover Fur-ever Friend",
    description:
      "Shelters are home to a wonderful animals, with unique personalities waiting to be discovered. ",
    icon: paw,
    iconFilled: pawFilled,
  },
];

// Content for the Card in Help section
// TODO: add image or icon property in each objects
const helpContent = [
  {
    title: "Donate",
    description:
      "Shelters need money to cover the costs of food, shelter, and medical care for the animals",
    icon: donate,
    iconFilled: donate_filled,
  },
  {
    title: "Adopt",
    description:
      "There are so many animals in shelters waiting for loving homes",
    icon: adopt,
    iconFilled: adopt_filled,
  },
  {
    title: "Volunteer",
    description:
      "Rescue shelters are always in need of volunteers to help with a variety of tasks",
    icon: volunteer,
    iconFilled: volunteer_filled,
  },
  {
    title: "Sponsor",
    description:
      "If you can't adopt an animal permanently, you can consider sponsoring one",
    icon: sponsor,
    iconFilled: sponsor_filled,
  },
  {
    title: "Advocate",
    description:
      "Help animal adoption centers by advocating for animal welfare laws and policies.",
    icon: advocate,
    iconFilled: advocate_filled,
  },
  {
    title: "Spread The Word",
    description:
      "Tell your friends about your local animal adoption center and encourage them to help out",
    icon: stw,
    iconFilled: stw_filled,
  },
];

// Orange filter for image
const filter = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "rgba(213, 127, 46, 0.5)",
};

export { pages, legal, contacts, cardContent, helpContent, filter };
