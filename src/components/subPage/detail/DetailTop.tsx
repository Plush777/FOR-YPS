import letterModalStyles from "@/components/letterModal/letterModal.module.css";

interface Props {
  data: {
    username: string;
    created_at: string;
  };
  useType: string;
  currentUser?: {
    avatar_url?: string;
    name?: string;
  };
}

export default function DetailTop({ data, useType, currentUser }: Props) {
  function useTypeStyleCondition() {
    if (useType === "modal") return letterModalStyles.modal;
    if (useType === "detail") return letterModalStyles.detail;

    return "";
  }

  return (
    <div className={`${letterModalStyles.bodyTop} ${useTypeStyleCondition()}`}>
      <div className={letterModalStyles.titleArea}>
        {currentUser?.avatar_url && (
          <img
            className={letterModalStyles.img}
            src={currentUser.avatar_url}
            alt="Profile"
          />
        )}

        {data.username && (
          <strong className={letterModalStyles.username}>
            {data.username}&nbsp;님의 편지
          </strong>
        )}
      </div>

      <span className={letterModalStyles.date}>
        {new Date(data.created_at).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
    </div>
  );
}
