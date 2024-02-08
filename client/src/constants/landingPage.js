// Footer and Navbar content links
const pages = ["About", "Animals", "Learn", "Donate", "Contact"];

const legal = ["Terms of Services", "Privacy Policy", "Data Privacy Act"];

const contacts = [
  "University of Caloocan City - North Congress",
  "+63-994-478-639",
  "lyfiesupport@gmail.com",
];

// Content for the card in Hero section
const cardContent = [
  {
    title: "Save A Life",
    description:
      "By adopting from a local shelter, you are directly pulling an animal at risk of euthanasia.",
  },
  {
    title: "Support Your Community",
    description:
      "Shelters rely on community support to function and care for their animals.",
  },
  {
    title: "Discover Fur-ever Friend",
    description:
      "Shelters are home to a wonderful animals, with unique personalities waiting to be discovered. ",
  },
];

// Content for the Card in Help section
// TODO: add image or icon property in each objects
const helpContent = [
  {
    title: "Donate",
    description:
      "Shelters need money to cover the costs of food, shelter, and medical care for the animals",
  },
  {
    title: "Adopt",
    description:
      "There are so many animals in shelters waiting for loving homes",
  },
  {
    title: "Volunteer",
    description:
      "Rescue shelters are always in need of volunteers to help with a variety of tasks",
  },
  {
    title: "Sponsor",
    description:
      "If you can't adopt an animal permanently, you can consider sponsoring one",
  },
  {
    title: "Advocate",
    description:
      "Help animal adoption centers by advocating for animal welfare laws and policies.",
  },
  {
    title: "Spread The Word",
    description:
      "Tell your friends about your local animal adoption center and encourage them to help out",
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
