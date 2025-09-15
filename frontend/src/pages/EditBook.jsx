import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";
import Spinner from "../components/Spinner.jsx";


const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/books/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPublishYear(res.data.publishYear);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = () => {
        const data = { title, author, publishYear };
        setLoading(true);
        axios
            .put(`http://localhost:5001/books/${id}`, data)
            .then(() => {
                setLoading(false);
                // toast.success("Book updated successfully ✅");
                setTimeout(() => navigate(`/books/details/${id}`), 1500);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                
            });
    };

    return (
        <div className="min-h-screen p-6 bg-base-200">
            <BackButton />
            <h1 className="text-3xl font-bold mb-6">Edit Book</h1>

            {loading ? (
                <Spinner />
            ) : (
                <div className="card w-full max-w-2xl bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        <h2 className="card-title">Update Book Information</h2>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter book title"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Author</span>
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Enter author name"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Publish Year</span>
                            </label>
                            <input
                                type="number"
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                                placeholder="Enter publish year"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <button onClick={handleUpdate} className="btn btn-primary">
                                Save Changes
                            </button>
                            <button onClick={() => navigate(-1)} className="btn btn-ghost">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EditBook;
