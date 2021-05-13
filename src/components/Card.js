const Card = ({ title, urlImg, description }) => {
  return (
    <div className="card">
      <span>{title}</span>
      <img className="card-img" src={urlImg} alt="" />
      <span>{description}</span>
    </div>
  );
};

export default Card;
