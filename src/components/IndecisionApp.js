import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        subtitle: 'Ask me anything',
        options: [],
        selectedOption: undefined
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (error) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const options = JSON.stringify(this.state.options);
            localStorage.setItem('options', options);
        }
    }
    handleModalOkay = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    }

    handleAddOption = (option) => {
        option = option.trim();
        if (!option) {
            return 'Option cannot be empty!';
        }

        if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists!';
        }

        this.setState((prev) => ({ options: prev.options.concat(option) }));
    }

    handleRemoveAll = () => {
        this.setState(() => ({ options: [] }));
    }

    handleRemoveOption = (optionToRemove) => {
        this.setState((prev) => ({ options: prev.options.filter((option) => option !== optionToRemove) }));
    }

    render() {
        return (<div>
            <Header subtitle={this.state.subtitle} />
            <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
            <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll} handleRemoveOption={this.handleRemoveOption} />
            <AddOption handleAddOption={this.handleAddOption} />
            <OptionModal selectedOption={this.state.selectedOption} onOK={this.handleModalOkay} />
        </div>);
    }
}