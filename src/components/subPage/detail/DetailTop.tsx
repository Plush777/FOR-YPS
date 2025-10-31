import detailTopStyles from "@/components/subPage/detail/detailTop.module.css";
import letterModalStyles from "@/components/letterModal/letterModal.module.css";
interface Props {
  data: {
    username: string;
    created_at: string;
  };
  useType: string;
}

export default function DetailTop({ data, useType }: Props) {
  function useTypeStyleCondition() {
    if (useType === "modal") {
      return {
        top: {
          modalBodyTop: letterModalStyles.modalBodyTop,
          username: letterModalStyles.username,
        },
        date: {
          modalDate: letterModalStyles.modalDate,
        },
      };
    }

    if (useType === "detail") {
      return {
        top: {
          modalBodyTop: `${letterModalStyles.modalBodyTop} ${detailTopStyles.modalBodyTop}`,
          username: `${letterModalStyles.username} ${detailTopStyles.username}`,
        },
        date: {
          modalDate: `${letterModalStyles.modalDate} ${detailTopStyles.modalDate}`,
        },
      };
    }
  }

  const useTypeStyles = useTypeStyleCondition();

  return (
    <div className={useTypeStyles?.top.modalBodyTop}>
      {data.username && (
        <strong className={useTypeStyles?.top.username}>
          {data.username}&nbsp;님의 편지
        </strong>
      )}

      <span className={useTypeStyles?.date.modalDate}>
        {new Date(data.created_at).toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
    </div>
  );
}
