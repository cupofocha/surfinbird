import "./DeleteButton.css"
import GlobalVar from "../GlobalVar";
import {toast} from "react-toastify";
import Delete from "../images/icons8-delete-24.png"
import History from "../History";

export default function DeleteButton(props) {
    const deletionType = props.deletionType
    const id = props.id

    function someToasts(state){
        if(state === "Success"){
            toast.success('Post deleted successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        else {
            toast.error('Deletion fails', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    function handleClick(){
        if(deletionType === "post") {
            const url = GlobalVar.apiServer + "post/image/" + id
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {someToasts(data.state)
                    window.history.back(-1)})
        }
        else if(deletionType === "comment") {
            const url = GlobalVar.apiServer + "comment/" + id
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {someToasts(data.state)
                    History.go()})
        }
    }

    return (
        <div className="delete-button-background">
            <img src={Delete} className="delete-button" onClick={handleClick} />
        </div>
    )
}