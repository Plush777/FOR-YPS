import letterModalStyles from "@/components/page/sub/letterModal/letterModal.module.css";

interface Props {
  data: {
    username: string;
    created_at: string;
  };
  avatarUrl?: string | null; // ✅ 작성자 avatar만 받기
  useType: string;
}

export default function DetailTop({ data, useType, avatarUrl }: Props) {
  // console.log(currentUser);
  console.log(avatarUrl);
  console.log(data);

  const hasAvatar = Boolean(avatarUrl);

  const avatarSrc = hasAvatar
    ? avatarUrl!
    : "/images/common/img-user-default.png";

  function useTypeStyleCondition() {
    if (useType === "modal") return letterModalStyles.modalType;
    if (useType === "detail") return letterModalStyles.detailType;

    return "";
  }

  return (
    <div className={`${letterModalStyles.bodyTop} ${useTypeStyleCondition()}`}>
      <div className={letterModalStyles.titleArea}>
        <img
          src={avatarSrc}
          alt="profile"
          className={`
            ${letterModalStyles.img}
            ${!hasAvatar ? letterModalStyles.imgScaleDown : ""}
          `}
        />

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
