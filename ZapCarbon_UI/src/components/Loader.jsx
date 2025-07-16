import { ClipLoader } from "react-spinners";


function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#eff1e6]">
      <ClipLoader color="#0a5548" size={60} />
    </div>
  )
}

export default Loader