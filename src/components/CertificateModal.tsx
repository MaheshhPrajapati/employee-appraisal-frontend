import './CertificateModal.css';
interface Props {
    data: { certification: string; udemy_link: string; }[];
    onClose: () => void;
}

const CertificateModal: React.FC<Props> = ({ data, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
            <h3>LIST OF CERTIFICATIONS RECOMMENDED FOR YOU</h3>
                {data.map((item, idx) => <div>
                    <a href={item.udemy_link} >LINK </a>
                    <span>{item.certification}</span>
                </div>)}
                <button className="button" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default CertificateModal;