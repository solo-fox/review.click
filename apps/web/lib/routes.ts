const routes = {
  base: process.env.NEXT_PUBLIC_SITE_URL,
  api: {
    auth: {
      callback: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  },
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    onboarding: "/auth/onboarding",
  },
  protected: {
    dashboard: "/dashboard",
  },
};

export default routes;
