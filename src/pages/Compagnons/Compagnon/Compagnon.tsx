import { useParams } from "react-router-dom";

const Compagnon = () => {
  const { compagnonId } = useParams();
  return <div>{`Compagnon ${compagnonId}`}</div>;
};

export default Compagnon;
