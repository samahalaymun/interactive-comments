
function Modal({confirm,cancel}) {
  return (
    <div
      className="fixed top-0 left-0 bg-[#00000080] z-3 w-full h-full flex justify-center items-center"
      onClick={cancel}
    >
      <div className="bg-white rounded-lg p-8 max-w-[370px]">
        <h2 className="font-semibold text-2xl text-dark-blue">
          Delete Comment
        </h2>
        <p className="text-grayish-blue my-4">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="w-full flex gap-4">
          <button className="rounded-lg font-semibold w-full bg-grayish-blue hover:opacity-75 cursor-pointer text-white uppercase p-3">
            no, cancel
          </button>
          <button
            className="rounded-lg font-semibold w-full bg-soft-red hover:bg-pale-red cursor-pointer text-white uppercase p-3"
            onClick={(e) => {
              e.preventDefault();
              confirm();
            }}
          >
            yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal
