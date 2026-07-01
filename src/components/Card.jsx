// generic card
function Card({ image, title, subtitle, meta, badge, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {badge && <span className="card-badge">{badge}</span>}
      <img className="card-image" src={image} alt={title} loading="lazy" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {meta && <p className="card-meta">{meta}</p>}
      </div>
    </div>
  );
}

export default Card;
