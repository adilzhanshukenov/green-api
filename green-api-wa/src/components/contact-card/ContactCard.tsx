import "./contactcard.css";

interface ContactCardProps {
  name: string;
  number: string;
  handleClick: () => void;
}

const ContactCard = ({ name, number, handleClick }: ContactCardProps) => {
  return (
    <div onClick={handleClick} className="contact-card">
      <p>{name}</p>
      <p>{number}</p>
    </div>
  );
};

export default ContactCard;
