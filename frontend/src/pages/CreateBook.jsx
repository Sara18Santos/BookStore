import Spinner from '../components/Spinner.jsx';
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/backButton';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveBook = () => {
        const data = { title, author, publishYear };
        setLoading(true);
        axios
            .post('${import.meta.env.VITE_API_URL}/books/', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Check console');
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen p-6 bg-base-200">
            <BackButton />
            <div className="flex justify-center items-center h-full">
                <div className="card w-full max-w-xl bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="card-title justify-center text-3xl">Create Book</h1>

                        {loading && <Spinner />}

                        <form className="form-control gap-4">
                            {/* Título */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Insert title"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Autor */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Author</span>
                                </label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Insert author"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Ano de Publicação */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Publish Year</span>
                                </label>
                                <input
                                    type="number"
                                    value={publishYear}
                                    onChange={(e) => setPublishYear(e.target.value)}
                                    placeholder="Insert year"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Botões */}
                            <div className="card-actions justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={handleSaveBook}
                                    className="btn btn-primary w-full"
                                >
                                    Save Book
                                </button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;
