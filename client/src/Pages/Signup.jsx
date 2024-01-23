const Signup = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="border-2 border-black p-10 rounded-lg">
        <h1 className="text-2xl">Create Account</h1>
        <div className="flex space-x-4 mt-8">
          <input type="radio" name="clientType" id="adoptiveParent"></input>
          <label htmlFor="adoptiveParent">Adoptive Parent</label>
          <input type="radio" name="clientType" id="rescueShelter"></input>
          <label htmlFor="rescueShelter"> Rescue Shelter</label>
        </div>
        <form action="" method="POST" className="flex flex-col mt-10 space-y-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="emailInput"
            className="border-2 p-2"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="passwordInput"
            className="border-2 p-2"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="passwordInput"
            className="border-2 p-2"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded-xl"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
