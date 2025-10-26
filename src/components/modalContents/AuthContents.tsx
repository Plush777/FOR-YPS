import modalStyles from "@/components/modal/modal.module.css";
import Button from "@/components/button/Button";

import { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

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
          color="fill-white"
          styleType="roundedFull"
          text="Google"
          onClick={() => handleLogin("google")}
        />
        <Button
          iconName="kakao"
          color="yellow"
          styleType="roundedFull"
          text="Kakao"
          onClick={() => handleLogin("kakao")}
        />
        <Button
          iconName="naver"
          color="green"
          styleType="roundedFull"
          text="Naver"
        />
      </div>

      <p className={modalStyles.smallDesc}>{smallDescription}</p>
    </>
  );
}
