import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Navbartop from "./Navbartop";

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await axios.get(`http://localhost:5000/list`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("DATA", data?.data);
      setData(data.data);
    };
    loadData();
  }, []);

  return (
    <div className="App">
      <Navbartop />
      {/* <h1>List page</h1> */}
      <div className="list">
        <h3> List</h3>
        <div
          className="col-md-8"
          style={{ backgroundColor: "lightgrey", display: "grid" }}
        >
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>No</th>
                <th>File Name</th>
                <th>File Id</th>
                <th>Date</th>
              </tr>
              {data.includes("No Data Available")
                ? 
                <tr>
                <td>{}</td>
                <td>{data}</td>
                <td>{}</td>
                <td>{}
                </td>
              </tr>
                : data.map((file, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{file.file_name}</td>
                      <td>{file.file_id}</td>
                      <td>
                        {moment(file?.upload_date_time).format(
                          "DD-MM-YYYY/hh:mm:ss"
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
