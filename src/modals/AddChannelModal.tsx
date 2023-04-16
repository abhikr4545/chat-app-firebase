import React, { FormEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useClickOutside from '../hooks/useClickOutside';

interface ModalProps {
  onClose: () => void;
}

const AddChannelModal: React.FC<ModalProps> = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [showError, setShowError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const modalRef = useClickOutside(onClose)

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !description) {
      setShowError(true)
      return
    }

    setDisabled(true)

    const docRef = doc(collection(db, "groups"));

    await setDoc(docRef, { name, description });

    setDisabled(false)
    onClose()
  }

  return ReactDOM.createPortal(
    <div className="flex items-center justify-center bg-modal-background fixed top-0 left-0 w-full h-full z-[1000]">
      <div ref={modalRef} className="bg-sidebar-nav-color w-[350px] md:w-[650px] h-[360px] rounded-3xl px-7">
        <div className="modal__content flex flex-col mt-9 text-white">
          <h2 className="font-noto text-white font-bold text-lg">New Channel</h2>
            <input type="text" value={name} onChange={handleNameChange} className="bg-sidebar-color outline-none  w-[290px] md:w-[595px] h-[48px] rounded-lg placeholder:text-lg pl-6 placeholder:pt-3 placeholder:font-medium mt-4" placeholder="Channel name" />
            <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="outline-none w-[290px] md:w-[595px] h-[115px] rounded-lg bg-sidebar-color resize-none mt-8 
            placeholder:text-lg pl-6 pt-3 placeholder:font-medium"
            placeholder="Channel Description"
            />
          <span className={`text-red-700 ${showError ? "" : "text-transparent"}`}>Fill name and description</span>
          <button onClick={handleSave} className={`text-white ml-auto mr-2 w-24 h-12 bg-send rounded-lg ${disabled ? "disabled:opacity-25" : ""}`} disabled={disabled ? true : false}>
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement,
  );
};

export default AddChannelModal;
