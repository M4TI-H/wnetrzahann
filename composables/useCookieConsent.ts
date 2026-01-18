export const useCookieConsent = () => {
  const cookie = useCookie<string | null>("cookie_consent", {
    maxAge: 31536000,
    sameSite: "lax",
    path: "/",
    default: () => null,
    watch: true,
  });

  return cookie;
};
