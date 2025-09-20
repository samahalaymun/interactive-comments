
function Overlay({ onClick }) {
  return (
    <div
      className="fixed top-0 left-0 bg-transparent z-1 w-full h-full "
      onClick={onClick}
    ></div>
  );
}

export default Overlay
