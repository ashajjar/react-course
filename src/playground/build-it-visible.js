class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      visibility: false
    };
  }

  toggleVisibility() {
    this.setState((prev) => {
      return {
        visibility: !prev.visibility
      };
    });
  }

  render() {
    let visibility = this.state.visibility;
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.toggleVisibility}>
          {visibility ? 'Hide details' : 'Show details'}
        </button>
        {visibility && (
          <div>
            <p>Hey. These are some details you can now see!</p>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));