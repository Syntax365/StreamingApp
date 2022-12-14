import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

export function LoginCTA() {
  return (
    <>
      <GoogleOAuthProvider clientId="789377329365-72in33adnh7fn00fb51lc94jcear1qir.apps.googleusercontent.com">
        <GoogleLogin
          size="medium"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            console.log("Logged in!");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}
