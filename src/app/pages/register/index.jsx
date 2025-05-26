import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import { useScrollToTop } from "@hooks";
import { PlainRegister } from "./plain-register";
import { EmailRegister } from "./email-register";
import { CompleteRegister } from "./complete-register";

export const REGISTER_TYPE = {
  COMPLETE: "complete",
  EMAIL: "email",
  PLAIN: "plain",
};

export default function RegisterPage() {
  useScrollToTop();
  const location = useLocation();
  const { registerType } = location?.state || {};

  const RenderRegister = useMemo(() => {
    switch (registerType) {
      case REGISTER_TYPE.EMAIL: {
        return <EmailRegister />;
      }
      case REGISTER_TYPE.COMPLETE: {
        return <CompleteRegister />;
      }
      case REGISTER_TYPE.PLAIN:
      default: {
        return <PlainRegister />;
      }
    }
  }, [registerType]);

  return (
    <>
      <Helmet>
        <title>Dhanika Register</title>
        <meta
          name="description"
          content="Create your Dhanika account to access personalized services, order tracking, and more."
        />
        <meta
          name="keywords"
          content="Dhanika registration, sign up, create account, new user"
        />
      </Helmet>

      {RenderRegister}
    </>
  );
}
