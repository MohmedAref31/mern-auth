import Swal from "sweetalert2";

export const notify = (msg, title) =>
Swal.fire({
  title: title,
  text: msg,
  icon: title
});