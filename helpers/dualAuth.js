import { Client } from "@duosecurity/duo_universal";

import { config } from "../config/authConfig";

export async function duo(req, res) {
  console.log("Starting Duo Funcitonality");

  const username = "prill2ts@gmail.com";

  const { port, url, clientId, clientSecret, apiHost, redirectUrl } = config;
  const duoClient = new Client({
    port,
    url,
    clientId,
    clientSecret,
    apiHost,
    redirectUrl,
  });

  try {
    await duoClient.healthCheck();

    const state = duoClient.generateState();
    const encodedUsername = encodeURIComponent(username);
    const encodedState = encodeURIComponent(state);
    duoClient.redirectUrl = redirectUrl + `/${encodedUsername}/${encodedState}`;

    const url = await duoClient.createAuthUrl(username, state);

    res
      .status(200)
      .send(
        `Authorizing Request<iframe src=${url} height=0 width=0 style="border-width: 0px"></iframe>`,
      );
  } catch (error) {
    console.log("Error in Auth System: ", error);
  }
  res.status(500).send(`Unable to Authenticate`);
  return;
}

export async function duoRedirect(req, res) {
  const { query } = req;
  const { duo_code, state, slug } = query;

  if (!duo_code || typeof duo_code !== "string") {
    return {
      message: `Missing 'duo_code' query parameters`,
      status: 500,
    };
  }

  if (!state || typeof state !== "string") {
    return { message: `Missing 'state' query parameters`, status: 500 };
  }

  const savedUsername = slug[0];
  const savedState = slug[1];

  if (
    !savedState ||
    typeof savedState !== "string" ||
    !savedUsername ||
    typeof savedUsername !== "string"
  ) {
    return { message: "Missing user session information", status: 500 };
  }

  if (state !== savedState) {
    return {
      message: "Duo state does not match saved state",
      status: 500,
    };
  }

  try {
    let { port, url, clientId, clientSecret, apiHost, redirectUrl } = config;
    redirectUrl =
      redirectUrl +
      `/${encodeURIComponent(slug[0])}/${encodeURIComponent(slug[1])}`;

    const duoClient = new Client({
      port,
      url,
      clientId,
      clientSecret,
      apiHost,
      redirectUrl,
    });

    const decodedToken = await duoClient.exchangeAuthorizationCodeFor2FAResult(
      duo_code,
      savedUsername,
    );

    res.status(200).send(
      `<script>
            console.log('Successfully Authorized');
            window.parent.postMessage({ message: "Testing", status: 200 }, "*");
        </script>`,
    );
    // return {
    //   message: JSON.stringify(decodedToken, null, "\t"),
    //   status: 200,
    // };
  } catch (err) {
    console.error(err);

    return {
      message: "Error decoding Duo result. Confirm device clock is correct.",
      status: 500,
    };
  }
}
