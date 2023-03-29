import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Navbartop from "./Navbartop";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ReactPaginate from "react-paginate";
import NoAuth from "./NoAuth";
import { baseUrl } from "./Common";

export default function Users() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)

  const listPerPage = 5;
  const pagesVisited =pageNumber * listPerPage;
  const pageCount = Math.ceil(data.length / listPerPage);
  const onPageChange =({selected})=>{
    setPageNumber(selected);
  }

  useEffect(() => {
    loadData();
  }, []);
  const auth = JSON.parse(localStorage.getItem('user'));

  const loadData = async () => {
    const data = await axios.get(`${baseUrl}/data`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("DATA", data?.data);
    setData(data.data);
  };
  
  

  // console.log(data.auth,"AUTH")

  // const handleDelete = (e) => {
  //   axios
  //     .delete(`http://localhost:5000/${e}`)
  //     .then((res) => {
  //       if (res) {
  //         loadData();
  //         setShow(true)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   };
    
    return (
      <div className="App">
      <Navbartop />
      {data.auth == false ?
        <NoAuth />:
      <div className="list">
        <ToastContainer position="top-center" className="p-3">
          <Toast
            className="d-inline-block m-1"
            bg="success"
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header bg="Success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-check"
                viewBox="0 0 16 16"
                color="green"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
              <strong className="me-auto">Deleted Successfully</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
        <h3> User's Registred List</h3>
        <div
          className="table-responsive"
          style={{ backgroundColor: "lightgrey", display: "grid", width: "95vw" }}
        >
          <table className="table table-hover" style={{"marginBottom": "0rem"}}>
            <thead>
              <tr>
                <th>No</th>
                <th>User Name</th>
                <th>Email Id</th>
                {/* <th>Date</th> */}
                {/* <th>Option</th> */}
              </tr>
            </thead>
            <tbody>
              {data.includes("No Data Available") ? (
                <tr>
                  <td>{}</td>
                  <td>{data}</td>
                  <td>{}</td>
                  {/* <td>{}</td> */}
                </tr>
              ) : (
                data
                .slice(pagesVisited,pagesVisited + listPerPage)
                .map((file, index) => (
                  <tr key={index}>
                    <td>{file.id}</td>
                    <td>{file.username}</td>
                    <td>{file.email}</td>
                    {/* <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          handleDelete(file.file_id);
                        }}
                        // onClick={() => setShow(true)}
                      >
                        DELETE
                      </button>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <ReactPaginate 
           previousLabel={"Previous"}
           nextLabel={"Next"}
           pageCount={pageCount}
           onPageChange={onPageChange}
           containerClassName={"paginationBtn"}
           previousLinkClassName={"previousBtn"}
           nextLinkClassName={"nextBtn"}
           disabledClassName={"paginationDisabled"}
           activeClassName={"paginationActive"}
          />
        </div>
        
      </div>
      }
    </div>
  );
}
