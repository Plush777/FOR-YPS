import letterModalStyles from "@/components/page/sub/letterModal/letterModal.module.css";

interface Props {
  data: {
    username: string;
    avatar_url: string;
    created_at: string;
  };
  useType: string;
}

export default function DetailTop({ data, useType }: Props) {
  function useTypeStyleCondition() {
    if (useType === "modal") return letterModalStyles.modalType;
    if (useType === "detail") return letterModalStyles.detailType;

    return "";
  }

  return (
    <div className={`${letterModalStyles.bodyTop} ${useTypeStyleCondition()}`}>
      <div className={letterModalStyles.titleArea}>
        {data.avatar_url && (
          <img
            className={letterModalStyles.img}
            src={data.avatar_url}
            alt="profile"
          />
        )}

        {data?.username && (
          <strong className={letterModalStyles.username}>
            {data.username}&nbsp;님의 편지
          </strong>
        )}
      </div>

      <span className={letterModalStyles.date}>
        {new Date(data?.created_at).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
    </div>
  );
}
