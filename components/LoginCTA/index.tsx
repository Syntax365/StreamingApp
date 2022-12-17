import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "3rem",
  height: "24px",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  marginTop: "4px",
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "purple",
  borderRadius: "0.25rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

export function LoginCTA(props: any) {
  const { isStacked, isSubmitting, login } = props;

  const [isAuth, setIsAuth] = useState(false);
  const [awaitingAuth, setAwaitingAuth] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});

  const options = {
    useOneTap: true,
    onSuccess: (tokenResponse: any) => {
      login();
      setIsAuth(true);
      setUserCredentials(tokenResponse);
      console.log(tokenResponse);
    },
  };

  const googleLogin = useGoogleLogin({
    ...options,
  });

  //useGoogleOneTapLogin({ ...options });

  const duoAuthenticate = async (target: HTMLElement) => {
    const response = await fetch("/api/authentication");
    setAwaitingAuth(true);
    const result = (await response.text()) || "Denyed Access";
    target.innerHTML = String(result);
  };

  useEffect(() => {
    window.addEventListener("message", postRecieved, false);

    return window.addEventListener("message", postRecieved, false);
  }, []);

  const postRecieved = () => {
    console.log("Window Post Successfully Communicated");
    setAwaitingAuth(false);
    setIsAuth(true);
    login();
    console.log("User Authorized");
  };

  return isAuth ? (
    <motion.button
      type={"submit"}
      whileHover={{ scale: 1.03 }}
      disabled={isSubmitting ? true : false}
      className={`border-purple-300 border-2 rounded-lg py-2 px-3 items-center flex justify-center  w-full ${
        isStacked ? "w-full" : ""
      }`}
      style={{ fontWeight: "500", color: "#9457eb" }}
    >
      {isSubmitting ? (
        <motion.div
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        </motion.div>
      ) : (
        "Submit Prompt"
      )}
    </motion.button>
  ) : (
    <>
      <motion.button
        disabled={awaitingAuth}
        whileHover={{ scale: awaitingAuth ? 1 : 1.03 }}
        className={`border-purple-300 border-2 rounded-lg py-2 px-3 min-w-[165px] ${
          isStacked ? "w-full" : ""
        }`}
        style={{ fontWeight: "500", color: "#9457eb" }}
        onClick={(event) => {
          //googleLogin();
          duoAuthenticate(event.currentTarget);
        }}
      >
        Request Access
      </motion.button>
    </>
  );
}
