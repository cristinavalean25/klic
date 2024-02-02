import { PropertyDetails } from "../types/PropertyDetails";

const Proprietate: React.FC<PropertyDetails> = ({
  idnum,
  dataadaugare,
  suprafatabalcon,
}) => {
  return (
    <div>
      <p>{idnum}</p>
      <p>{dataadaugare}</p>
      <p>{suprafatabalcon}</p>
    </div>
  );
};

export default Proprietate;
