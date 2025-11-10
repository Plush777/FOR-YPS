import modalStyles from "@/components/modal/base/modal.module.css";
import Button from "@/components/button/base/Button";

import { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import Wave from "@/components/common/animation/wave/Wave";

interface Props {
  description: ReactNode;
  smallDescription: ReactNode;
}

export default function AuthContents({ description, smallDescription }: Props) {
  async function handleLogin(provider: "google" | "kakao") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/`, // 로그인 후 리다이렉트
      },
    });
    if (error) alert(error.message);
  }

  return (
    <>
      <p className={modalStyles.desc}>{description}</p>

      <div className={modalStyles.authButtonGroup}>
        <Button
          iconName="google"
          onlyIcon={false}
          size="lg"
          color="fill-white"
          text="Google"
          onClick={() => handleLogin("google")}
        />
        <Button
          iconName="kakao"
          onlyIcon={false}
          size="lg"
          color="yellow"
          text="Kakao"
          onClick={() => handleLogin("kakao")}
        />
        <Button
          iconName="x"
          onlyIcon={false}
          size="lg"
          color="black"
          text="X (Twitter)"
        />
      </div>

      <p className={modalStyles.smallDesc}>{smallDescription}</p>

      <Wave />
    </>
  );
}
