import topImage from "../assets/images/passive2.png";
import logo from "../assets/icons/SAS_Logo4.png";

export const LoginCard = () => {
  return (
    <>
      <div className="h-full relative">
        <img
          src={topImage}
          alt="top image"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <img src={logo} alt="logo" className="h-[91px] w-[91px]" />
          <Typography component="div" variant="h3" ml="22px" color="white">
            SaveAStray
          </Typography>
        </div>
      </div>
    </>
  );
};
