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

const sectionContent = [
  {
    title: "About SaveAStray",
    p1: "More Than Coding, We're Pawsitive Changemakers",
    p2: "We're not just student coders, we're a band of passionate hearts united by a furry mission: to be the bridge between the yearning gazes of abandoned paws and the welcoming arms of loving homes. We dream of a world where adoption is seamless, joyful, and accessible to all.",
    p3: "Imagine - no more endless shelter visits, no more uncertainty, just a vibrant platform teeming with wagging tails and soulful eyes waiting to be discovered. That's what we're building - a one-stop shop for adoption journeys, powered by the magic of technology and fueled by our unwavering love for animals.",
    p4: "Hundreds of furry souls, each with a unique story and a heart full of hope, wait patiently for their second chance. We believe adoption is not just about giving a dog a home, it's about finding the perfect missing piece for both human and animal. Through our platform, we facilitate meaningful connections, ensuring every match is a love story waiting to be written.",
    p5: "We're not just building a platform, we're building a community. A community of paw-rents who understand the unconditional love and unwavering loyalty a dog brings. A community of volunteers who dedicate their time and energy to animal welfare. A community of passionate coders like us, weaving lines of code into threads of hope and second chances.",
    p6: "Join us on this incredible journey. Adopt, volunteer, donate, or simply spread the word. Together, let's rewrite the narrative for abandoned paws, one loving connection at a time. Remember, every life deserves a chance to find its forever home, and together, we can make that dream a reality.",
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

export { aboutContent, team, sectionContent };
