import { useParams } from "react-router-dom";

const Country = () => {
  const { paysId } = useParams();
  return <div>{`Pays ${paysId}`}</div>;
};

export default Country;
