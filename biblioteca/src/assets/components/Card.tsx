import { Col } from "react-bootstrap";

interface CardProps {
  title: string;
  description: string;
  imgUrl: string;
  onClick: () => void; 
}

export const Card: React.FC<CardProps> = ({ title, imgUrl, onClick }) => {
  return (
    <Col
      size={9}
      sm={8}
      md={10}
      style={{
        display: "flex",
        flexWrap: "wrap",
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
            
            margin: "5%", 
            borderRadius: "8px",
            width: "500px",
            height: "100px",
          }}
        />
        <div className="proj-txtx" style={{ textAlign: "center", margin: "5px", width: "50000px" }}>
          <h4>{title}</h4>
          {/* <span>{description}</span> */}
        </div>
      </div>
    </Col>
  );
};
