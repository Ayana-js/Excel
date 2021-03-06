import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";

const Main = () => {
    
        const [items, setItems] = useState([])

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray,{type: 'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = ((error) => {
                reject(error);
            })
        });

        promise.then((d) => {
            setItems(d)
        }) 
    };

    const onSendExcel = () => {
        axios.post('https://62207732ce99a7de195a5afb.mockapi.io/users', {
            items
        })
    }

    return <div>
            <input 
                type="file" 
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }} 
            />

            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Item</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((d) => (
                            <tr key = {d.Item}>
                                <th>{d.Id}</th>
                                <th>{d.Name}</th>
                                <td>{d.Description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>''
            <Link to="/progress">
          <button
                onClick={onSendExcel}
            >
                Send
            </button>
        </Link>
        </div>  
};

export default Main;