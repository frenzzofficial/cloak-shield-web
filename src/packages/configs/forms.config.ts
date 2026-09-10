import { envDefaultUserConfig } from "../env/user.env";

export const formsConfig = {
  animationType: {
    direction: "right",
    duration: 500,
  },

  // ✅ Default values for forms
  defualtValues: {
    fullname: envDefaultUserConfig.DEFAULT_USER_FULLNAME,
    email: envDefaultUserConfig.DEFAULT_USER_EMAIL,
    password: envDefaultUserConfig.DEFAULT_USER_PASSWORD,
    confirmPassword: envDefaultUserConfig.DEFAULT_USER_PASSWORD,
    remember: false,
    agreeToTerms: false,
  },
};
