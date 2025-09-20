
function PostButton({ label, onClick, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg cursor-pointer hover:bg-light-grayish-blue bg-moderate-blue text-white py-3 px-7 uppercase font-medium"
    >
      {label}
    </button>
  );
}

export default PostButton;
