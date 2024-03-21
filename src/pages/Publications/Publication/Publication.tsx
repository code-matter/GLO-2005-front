import { useParams } from "react-router-dom";

const Publication = () => {
  const { publicationId } = useParams();

  return <div>{`Publication ${publicationId}`}</div>;
};

export default Publication;
