import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5001/books")
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 min-h-screen bg-base-200">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">📚 Book List</h1>
                <Link to="/books/create" className="btn btn-primary flex items-center gap-2">
                    <MdOutlineAddBox className="text-xl" />
                    Add New Book
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th className="max-md:hidden">Author</th>
                                <th className="max-md:hidden">Publish Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book._id}>
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td className="max-md:hidden">{book.author}</td>
                                    <td className="max-md:hidden">{book.publishYear}</td>
                                    <td>
                                        <div className="flex gap-2 justify-center">
                                            <Link
                                                to={`/books/details/${book._id}`}
                                                className="btn btn-info btn-xs"
                                            >
                                                <BsInfoCircle className="text-lg" />
                                            </Link>
                                            <Link
                                                to={`/books/edit/${book._id}`}
                                                className="btn btn-warning btn-xs"
                                            >
                                                <AiOutlineEdit className="text-lg" />
                                            </Link>
                                            <Link
                                                to={`/books/delete/${book._id}`}
                                                className="btn btn-error btn-xs"
                                            >
                                                <MdOutlineDelete className="text-lg" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Home;
