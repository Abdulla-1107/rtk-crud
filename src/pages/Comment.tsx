import { useGetCommentsQuery } from "../redux/api/comment.api";
import Form from "../components/form/Form";
import CommentWrapper from "../components/comment-wrapper/CommentWrapper";

const Comment = () => {
  const { isLoading } = useGetCommentsQuery({ limit: 500 });
  return (
    <div>
      <Form />
      <h2>Comment</h2>
      {isLoading && <p>Loading...</p>}
      <CommentWrapper/>
    </div>
  );
};

export default Comment;
