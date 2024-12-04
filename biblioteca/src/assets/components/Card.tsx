import { Col } from "react-bootstrap";

interface CardProps {
  title: string;
  description: string;
  imgUrl: string;
  onClick: () => void; 
}

export const Card: React.FC<CardProps> = ({ title, description, imgUrl, onClick }) => {
  return (
    <Col
      size={12}
      sm={6}
      md={4}
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        cursor: "pointer", 
      }}
      onClick={onClick} 
    >
      <div className="proj-imgbx">
        <img
          src={imgUrl}
          alt={title}
          style={{
            margin: "0 auto", 
            borderRadius: "8px",
          }}
        />
        <div className="proj-txtx" style={{ textAlign: "center", marginTop: "10px" }}>
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
