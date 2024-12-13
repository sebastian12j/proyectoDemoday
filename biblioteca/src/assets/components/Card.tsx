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
      size={3}
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
            
            margin: "3%", 
            borderRadius: "8px",
            width: "100px",
            display: "flex",

          }}
        />
        <div className="proj-txtx" style={{ textAlign: "center", margin: "5px", width: "100px" }}>
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
