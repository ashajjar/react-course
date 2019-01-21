class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.state = {
      subtitle: 'Ask me anything',
      options: []
    };
  }

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

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option) {
    option = option.trim();
    if (!option) {
      return 'Option cannot be empty!';
    }

    if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists!';
    }

    this.setState((prev) => ({ options: prev.options.concat(option) }));
  }

  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }

  handleRemoveOption(optionToRemove) {
    this.setState((prev) => ({ options: prev.options.filter((option) => option !== optionToRemove) }));
  }

  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
        <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll} handleRemoveOption={this.handleRemoveOption} />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value;
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));
    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type='text' name='option' autoComplete='off' autoFocus />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
};
const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      <ol>
        {
          props.options.map((option) => (
            <Option
              key={option}
              optionText={option}
              handleRemoveOption={props.handleRemoveOption} />
          ))
        }
      </ol>
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      <li>
        {props.optionText}
        <button onClick={(e) => {
          props.handleRemoveOption(props.optionText);
        }}>Remove</button>
      </li>
    </div>
  );
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
