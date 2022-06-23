import React, { useContext, useEffect } from "react";
import LandingBackground from "./LandingBackground";
import SignInUpPanel from "./SignInUp/SignInUpPanel";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const { currentUser } = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/Home")
  }, [ currentUser ])

  return (
    <>
      <LandingBackground />
      <SignInUpPanel />
    </>
  )
}

export default Landing;
