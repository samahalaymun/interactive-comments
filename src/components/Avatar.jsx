
export default function Avatar({avatar,width,height}) {
  
  return (
    <>
      <img alt="avatar" className={`rounded-full ${width} ${height}`} src={avatar} />
    </>
  );
}
