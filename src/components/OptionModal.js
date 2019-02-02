import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        contentLabel="Selected Option"
        isOpen={!!props.selectedOption}
        onRequestClose={props.onOK}
    >
        <h3>Selected Option</h3>
        <p>{props.selectedOption}</p>
        <button onClick={props.onOK}>Okay</button>
    </Modal>
);

export default OptionModal;