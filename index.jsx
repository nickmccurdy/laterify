function Item (props) {
  return (
    <li>
      {props.data.name}
    </li>
  )
}

function ItemList (props) {
  return (
    <div>
      <h2>{props.type}</h2>
      <ul>
        {props.items.map((item) => <Item key={item.id} data={item} />)}
      </ul>
    </div>
  )
}

function Results (props) {
  var resultKeys = Object.keys(props.results)

  return (
    <div>
      {resultKeys.map((type) => <ItemList key={type} type={type} items={props.results[type].items} />)}
    </div>
  )
}

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      results: []
    }
  }

  componentDidMount () {
    fetch('https://api.spotify.com/v1/search?type=artist,album,track,playlist&q=' + encodeURIComponent(this.props.query))
      .then((response) => response.json())
      .then((results) => { this.setState({ results }) })
  }

  render () {
    return <Results results={this.state.results} />
  }
}

ReactDOM.render(<App query='Swans' />, document.getElementById('root'))
