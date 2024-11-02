import "./write.css"

export default function Write() {
  return (
    <div className="write">
        {/* For when uploading an iamge */}
        <img
            className="writeImg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
        />
        {/* For uplaod button, Title, Description, and Publish button */}
        <form className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i> {/* + icon */}
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} /> {/* upload file using Inline CSS */}
                <input type="text" placeholder="Title" className="writeInput" autoFocus={true} /> {/* cursor auto in to enter text*/}
            </div>
            <div className="writeFormGroup">
                <textarea placeholder="Tell your story..." type="text" className="writeInput writeText" ></textarea>
            </div>
            <button className="writeSubmit">Publish</button>
        </form>
    </div>
  )
}
