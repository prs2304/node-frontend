import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { baseUrl } from "./Common";
import Navbartop from "./Navbartop";

function App() {
  const [files, setFiles] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const [showerror, setShowError] = useState(false);

  const [fileError, setFileError] = useState("");
  console.log(files, "DD");

  const formData = new FormData();

  for (let i = 0; i < files?.length; i++) {
    formData.append("file", files[i]);
    // formData.append("fileName", files.name);
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(files, "FILES");
    console.log(fileError?.length, "ErrLen");
    if (files == "" || files == null || files == undefined) {
      setFileError("Please select a file");
    }

    if (files !== "") {
      axios
        .post(`${baseUrl}/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data == "Successfully uploaded") {
            setShow(true);
            setFiles("");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setShowError(true);
            setErrMsg(err);
          }
        });
    }
  };

  return (
    <div className="App">
      <Navbartop />
      <header className="App-header">
        <h1>File Upload Multiple</h1>
        <input
          type="file"
          className="form-control form-control-lg"
          onChange={(e) => {
            setFiles(e.target.files);
            setFileError("");
          }}
          multiple
          style={{ width: "50vw" }}
        />
        <div className="text-danger">{fileError}</div>
        {show ? (
          <Alert
            show={show}
            variant="success"
            onClose={() => setShow(false)}
            dismissible
            style={{ marginTop:"10px"}}
          >
            File Uploaded Sucessfully
          </Alert>
        ) : showerror ? (
          <Alert
            show={showerror}
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
            style={{ marginTop:"10px", padding: "14px 26px 10px 10px" }}
          >
            Error occurred:{errMsg.message}
          </Alert>
        ) : null}
        <div className="btn-grp mt-3">
          <button
            type="submit"
            className="btn btn-info btn-space"
            onClick={refreshPage}
          >
            Reset
          </button>

          <button
            type="submit"
            className="btn btn-dark btn-space"
            onClick={(e) => {
              setShow(false);
              handleSubmit(e);
            }}
          >
            Upload
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
