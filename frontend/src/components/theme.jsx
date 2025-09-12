import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    // Temas disponíveis
    const themes = [
        'light', 'dark', 'cupcake', 'cyberpunk',
        'dracula', 'luxury', 'business', 'coffee', 'synthwave'
    ];

    // Aplicar tema no documento
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // salvar preferência
    }, [theme]);

    // Carregar tema salvo
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Escolha o tema:</h3>

            {/* Dropdown do DaisyUI */}
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                    Tema: {theme} ▼
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {themes.map((themeName) => (
                        <li key={themeName}>
                            <button
                                onClick={() => setTheme(themeName)}
                                className={theme === themeName ? 'active' : ''}
                            >
                                {themeName}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Preview do tema atual */}
            <div className="mt-4 p-4 border rounded">
                <h4 className="text-base font-semibold">Preview do tema {theme}:</h4>
                <button className="btn btn-primary mr-2">Primary</button>
                <button className="btn btn-secondary mr-2">Secondary</button>
                <button className="btn btn-accent">Accent</button>

                <div className="card w-full max-w-sm bg-base-100 shadow-xl mt-4">
                    <div className="card-body">
                        <h2 className="card-title">Card no tema {theme}</h2>
                        <p>Este é um exemplo de como fica o tema selecionado.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Action</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;