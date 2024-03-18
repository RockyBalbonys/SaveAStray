import { Container, Typography, Box, Stack } from "@mui/material";
import dogImage from "../../../assets/images/learn/learnImage.png";
import thirdSectionImage from "../../../assets/images/learn/learnImage2.png";
import Footer from "../../../Components/PageComponent/Footer";

const Learn = () => {
  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Learn;

function FirstSection() {
  return (
    <Container
      maxWidth="xl"
      sx={{ mb: "115px", mt: "20px" }}
      component="section"
    >
      <Typography variant="h2" gutterBottom fontSize={50}>
        Embracing Compassion: The Essence of Animal Adoption
      </Typography>
      <Box sx={{ display: "flex", columnGap: "20px", marginBottom: "13px" }}>
        <img
          src={dogImage}
          alt="dog image"
          className="hidden lg:block self-center h-full w-full"
        />
        <Stack direction="column" spacing="25px">
          <Typography>
            In a world where compassion meets responsibility, there exists a
            beautiful act that not only transforms lives but also touches the
            very essence of our humanity: animal adoption. It's more than a mere
            transaction; it's a heartfelt commitment to giving an innocent soul
            a second chance at life.
          </Typography>
          <Typography>Understanding Animal Adoption</Typography>
          <Typography>
            At its core, animal adoption is a profound gesture of love and care.
            It's the process through which individuals or families welcome a
            furry, feathery, or scaly companion into their homes from shelters
            or rescue organizations. It’s a promise to provide a loving,
            nurturing environment, ensuring their well-being and happiness
            throughout their lives.
          </Typography>
          <Typography>Why Choose Adoption?</Typography>
          <Typography>
            It’s a chance t o grant life anew—a space in your heart and home
            that rescues an animal from the shadows, offering them love, growth,
            and the warmth of a family they may never have known.
          </Typography>
        </Stack>
      </Box>
      <Stack spacing="25px">
        <Typography>
          Adoption is a stand against the dark underbelly of unethical breeding
          practices, fighting for a world where animals aren’t products but
          treasured companions. It’s a powerful voice promoting animal welfare,
          supporting the tireless efforts of shelters and rescue groups in their
          mission to protect those in need.{" "}
        </Typography>
        <Typography>The Journey of Adoption</Typography>
        <Typography>Step by step, the journey unfolds.</Typography>
        <Typography>
          First, you share your world, your preferences, and your dreams,
          allowing the perfect companion to find their way to you. Then, in the
          simple act of meeting and greeting, magic ignites—a connection formed,
          a bond forged.
        </Typography>
        <Typography>
          A home check ensures safety and suitability, paving the way for the
          final, beautiful step: adoption. A moment that marks not just a new
          addition but a heartfelt commitment to a lifelong friendship.
        </Typography>
        <Typography>After Adoption: Embracing Responsibility</Typography>
        <Typography>
          But adoption isn’t a destination; it’s the beginning of an everlasting
          adventure. It’s about ensuring their well-being—a commitment to their
          health, balanced nutrition, and the joy of physical and mental
          stimulation. Above all, it’s showering them with the love and care
          they deserve, nurturing a relationship that grows deeper with every
          passing day.
        </Typography>
        <Typography>In Conclusion</Typography>
        <Typography>
          Choosing adoption isn’t just about transforming an animal’s life; it’s
          a transformative journey for you too. It’s about choosing empathy,
          compassion, and love in its purest form.
        </Typography>
        <Typography>
          So, embark on this beautiful journey, share your home and heart, and
          witness the incredible joy of unlocking boundless love through animal
          adoption.
        </Typography>
        <Typography>With warmth and compassion,</Typography>
        <Typography>[SaveAStray Team] </Typography>
      </Stack>
    </Container>
  );
}

function SecondSection() {
  return (
    <Box className="bg-[#D9D9D9]" component="section">
      <Container maxWidth="xl" sx={{ paddingY: "67px" }}>
        <Typography variant="h2" gutterBottom fontSize={50}>
          Why Adopt in the Local Shelter?
        </Typography>
        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
          }}
          columnGap="27px"
          rowGap="27px"
          padding={2}
        >
          <Box width="100%" flexGrow={1}>
            <Typography mb="21px">Saving Lives</Typography>
            <Typography>
              Shelters are often overcrowded with animals in need of homes. By
              adopting, you’re giving a pet a second chance at life and making
              space for other animals in need.
            </Typography>
          </Box>
          <Box width="100%" flexGrow={1} spacing="21px">
            <Typography mb="21px">
              Promoting Humane Treatment of Animals
            </Typography>
            <Typography>
              Shelters provide care for animals that have often been abandoned
              or mistreated. By adopting from a shelter, you’re supporting their
              mission and contributing to the humane treatment of animals.
            </Typography>
          </Box>
          <Box width="100%" flexGrow={1} spacing="21px">
            <Typography mb="21px">Cost-Effective & Health Benefits </Typography>
            <Typography>
              Adoption fees at shelters are usually less than buying from
              breeders or stores. These fees cover initial vet care like
              vaccinations and neutering, making it cost-effective. Plus, you
              get a health-checked pet.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function ThirdSection() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: "115px" }}>
      <Typography variant="h2" gutterBottom fontSize={50}>
        How to be a RESPONSIBLE pet owner?
      </Typography>
      <div className="w-full flex justify-center h-[455px] mb-[25px]">
        <img src={thirdSectionImage} alt="girl with a dog" height="100%" />
      </div>
      <Stack direction="column" spacing="25px">
        <Typography>Caring for Your Pet: A Complete Responsibility</Typography>
        <Typography>
          Owning a pet is a full-time commitment, a symphony of care and
          responsibility. Routine vet check-ups, tailored diets, and regular
          exercise form the pillars of their well-being. Training and
          socializing your pet are essential for their development.
        </Typography>
        <Typography>
          Cleanliness is paramount—both for your pet and their environment.
          Affection and companionship are non-negotiable; quality time
          strengthens your bond. Don’t forget the small yet crucial
          details—micro-chipping, updated IDs, and spaying/neutering to control
          the pet population.
        </Typography>
        <Typography>
          Safety is key; keep harmful substances away, ensuring a secure space
          for your furry friend. Remember, pets are a lifelong commitment,
          needing unwavering care and attention. Upholding these practices
          ensures you’re giving your pet the very best.
        </Typography>
        <Typography>With care and dedication, [SaveAStray Team]</Typography>
      </Stack>
    </Container>
  );
}

function FAQSection() {
  return (
    <Container maxWidth="xl" sx={{ mb: "64px" }}>
      <Typography variant="h2" fontSize={50} mb="64px">
        Frequently Asked Questions (FAQs)
      </Typography>
      <Stack spacing="25px">
        <Typography>
          <strong>1) Why should I adopt a stray animal?</strong> Adopting a
          stray animal not only gives the animal a second chance at life but
          also helps reduce the number of animals in shelters. Stray animals,
          once given proper care and love, can turn out to be incredibly loyal
          and loving pets.
        </Typography>
        <Typography>
          <strong>
            2) What are the advantages of adopting a stray dog over buying from
            a breeder?
          </strong>{" "}
          Adopting a stray dog over buying from a breeder offers several
          advantages, including reducing the stray population, giving a second
          chance to a homeless animal, promoting responsible pet ownership, and
          gaining a loving and loyal companion while potentially saving a life
          through adoption.
        </Typography>
        <Typography>
          <strong>3) Are stray dogs healthy for adoption?</strong> While many
          stray dogs are healthy and make great pets, it's crucial to have them
          thoroughly examined by a veterinarian upon adoption. This ensures any
          health concerns are addressed, and the dog receives proper
          vaccinations and preventive care.
        </Typography>
        <Typography>
          <strong>4) What should I need to know about animal shelters?</strong>{" "}
          Animal shelters are dedicated to taking care of homeless animals. They
          provide these animals with necessary medical care, food, and shelter.
          When you adopt from a shelter, you’re supporting their mission to help
          as many animals as possible.
        </Typography>
      </Stack>
    </Container>
  );
}
