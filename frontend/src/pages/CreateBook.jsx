import Spinner from '../components/spinner';
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
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .post('http://localhost:5001/books', data)
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
        <div className='p-6 bg-gray-100 min-h-screen'> {/* Adicionado um fundo e um espaçamento maior */}
            <BackButton />
            <div className='flex justify-center items-center h-full'> {/* Centraliza o conteúdo vertical e horizontalmente */}
                <div className='w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200'> {/* Box principal com sombra e borda mais suave */}
                    <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>Criar Livro</h1> {/* Título com maior destaque */}
                    {loading && <Spinner />}
                    <form className='space-y-6'> {/* Utilizado `space-y` para espaçamento automático entre os campos */}
                        <div>
                            <label className='block text-lg font-medium text-gray-700 mb-1'>Título</label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-300 ease-in-out' // Transição para um efeito de foco mais suave
                            />
                        </div>
                        <div>
                            <label className='block text-lg font-medium text-gray-700 mb-1'>Autor</label>
                            <input
                                type='text'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-300 ease-in-out'
                            />
                        </div>
                        <div>
                            <label className='block text-lg font-medium text-gray-700 mb-1'>Ano de Publicação</label>
                            <input
                                type='number' // Alterado para tipo "number" para validação de entrada
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-300 ease-in-out'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleSaveBook}
                            className='w-full py-3 bg-sky-600 text-white font-semibold rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300 ease-in-out' // Botão com estilo mais profissional e interativo
                        >
                            Salvar Livro
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;