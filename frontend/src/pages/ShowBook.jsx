import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/backButton";
import Spinner from "../components/spinner";

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="min-h-screen p-6 bg-base-200">
            <BackButton />

            {loading ? (
                <Spinner />
            ) : (
                <div className="card w-full bg-base-100 shadow-xl mx-auto">
                    <div className="card-body">
                        {/* Card Header */}
                        <h2 className="card-title text-2xl justify-center">
                            📖 {book.title || "Untitled Book"}
                        </h2>

                        {/* Card Content */}
                        <div className="divider">Details</div>
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">ID:</span> {book._id}
                            </p>
                            <p>
                                <span className="font-semibold">Title:</span> {book.title}
                            </p>
                            <p>
                                <span className="font-semibold">Author:</span> {book.author}
                            </p>
                            <p>
                                <span className="font-semibold">Publish Year:</span>{" "}
                                {book.publishYear}
                            </p>
                            <p>
                                <span className="font-semibold">Created at:</span>{" "}
                                {book.createdAt
                                    ? new Date(book.createdAt).toLocaleString()
                                    : "-"}
                            </p>
                            <p>
                                <span className="font-semibold">Last Update:</span>{" "}
                                {book.updatedAt
                                    ? new Date(book.updatedAt).toLocaleString()
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
