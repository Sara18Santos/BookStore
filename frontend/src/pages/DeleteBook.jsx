import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";
import Spinner from "../components/Spinner.jsx";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const handleDeleteBox = () => {
        setLoading(true);
        axios
            .delete(`${import.meta.env.VITE_API_URL}/books/${id}`)
            .then(()=>{
                setLoading(false);
                navigate('/');
            })
            .catch((error)=>{
                setLoading(false);
                alert('An error happened.');
                console.log(error);
            })
    }
    return (
        <div className="p-4 min-h-screen text-gray-200">
            <BackButton/>
            <h1 className="text-3xl font-bold my-4 text-center text-brown-400">Delete Book</h1>

            {loading ? <Spinner/> : ''}
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-300">Are you sure you want to delete this book?</h3>
                <button onClick={handleDeleteBox} className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105">
                    Delete 
                </button>

                </div>
            


        </div>
        )
}

export default DeleteBook
