import missionIcon from "../assets/icons/mission.svg";
import visionIcon from "../assets/icons/vision.svg";
import valuesIcon from "../assets/icons/values.svg";
import anGhelo from "../assets/images/team/an-ghelo.png";
import jericho from "../assets/images/team/jericho.png";
import jhude from "../assets/images/team/jhude.png";
import joshua from "../assets/images/team/joshua.png";
import lance from "../assets/images/team/lance.png";
import lawrence from "../assets/images/team/lawrence.png";

const team = [
  {
    media: jhude,
    name: "Jhude Vergara",
    position: "Project Manager / Creative Engineer",
  },
  {
    media: lawrence,
    name: "Prince Lawrence Jacinto",
    position: "Software Engineer",
  },
  {
    media: lance,
    name: "Lance Samuel Ballesteros",
    position: "Software Engineer",
  },
  {
    media: jericho,
    name: "Prince Jericho Mabini",
    position: "Backend Developer",
  },
  {
    media: anGhelo,
    name: "An-Ghelo Mate",
    position: "Frontend Developer",
  },
  {
    media: joshua,
    name: "Joshua Cinco",
    position: "Frontend Developer",
  },
];

const aboutContent = [
  {
    section: "MISSION",
    title: "Our Mission",
    p1: "To serve as the unwavering bridge between abandoned animals and loving homes, revolutionizing the adoption landscape with technology and unwavering compassion.",
    p2: "We connect potential fur-parents with deserving furry souls, transforming loneliness into love, despair into hope, and stray existence into cherished companionship.",
    p3: "Through innovation and dedication, we aim to render our mission obsolete, creating a world where every paw print finds its warm and welcoming home.",
    icon: missionIcon,
  },
  {
    section: "VISION",
    title: "Our Vision",
    p1: "Our vision pulsates with the hope of a day when adoption isn't a necessity, but a joyful journey fueled by compassion and understanding.",
    p2: "We envision a ripple effect of kindness, where every tail wagging with newfound happiness inspires another act of love, another life transformed.",
    p3: "Let our vision guide us, let it ignite a fire within, and together, let's turn this dream into a reality, paw by paw.",
    icon: visionIcon,
  },
  {
    section: "VALUES",
    title: "Our Values",
    p1: "Compassion: We believe every animal deserves a chance at love and a warm, welcoming home.",
    p2: "Innovation: We are constantly seeking new ways to bridge the gap between shelters and potential families, ensuring a seamless and efficient experience for all.",
    p3: "Community: We foster a supportive community of compassionate individuals who share our love for animals. We celebrate every successful adoption and encourage others to join our mission, creating a ripple effect of kindness.",
    icon: valuesIcon,
  },
];

export { aboutContent, team };
