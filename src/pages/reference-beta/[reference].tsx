import Reference from "features/reference/Reference";
import { useRouter } from "next/router";

const Comment = () => {
  const router = useRouter();
  //@ts-ignore
  const reference: string = router.query.reference || "";

  return (
    <>
      <Reference type={reference} />
    </>
  );
};

export default Comment;
