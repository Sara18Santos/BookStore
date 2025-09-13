import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
    return (
        <div className="mb-4">
            <Link to={destination} className="btn btn-primary btn-sm">
                <BsArrowLeft className="text-lg" />
                Voltar
            </Link>
        </div>
    );
};

export default BackButton;
