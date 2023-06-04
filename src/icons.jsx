import "./icons.css";
const Icon = ({ content }) => {
  return <div className="cell-text">{!content ? "" : content}</div>;
};

export default Icon;
