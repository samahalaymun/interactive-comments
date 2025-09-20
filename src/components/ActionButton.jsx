function ActionButton({ type, onClick }) {
  const url = import.meta.env.BASE_URL;

  return (
    <button className={` action-btn action-btn--${type}`} onClick={onClick}>
      <img alt="action" src={url+`/assets/icon-${type}.svg`} />
      {type}
    </button>
  );
}

export default ActionButton;
