import { useDispatch, useSelector } from "react-redux"
import { deleteFaild, deleteStart, deleteSuccess } from "../redux/slices/userSlice";

export default function DeleteBtn() {
    const {loading , error}  = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const handleDelete = async ()=>{
        try {
            dispatch(deleteStart());
            const res = await fetch("/api/users/delete", {method: "DELETE"});
            console.log(res);
            if (res.ok === true) dispatch(deleteSuccess());
            else dispatch(deleteFaild());
          } catch (error) {
            console.log(error);
            dispatch(deleteFaild());
          }
    }
  return (
    <button
    type="button"
    onClick={handleDelete}
    className="bg-red-700 py-1 px-3 text-slate-50 font-semibold rounded-md flex items-center gap-1"
  >
    delete account
    {loading && (
      <span className=" animate-spin w-4 h-4  inline-block border-2 border-b-transparent border-slate-50 rounded-full"></span>
    )}
  </button>
  )
}
