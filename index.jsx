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

class Results extends React.Component {
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
    var resultKeys = Object.keys(this.state.results)

    return (
      <div>
        {resultKeys.map((type) => <ItemList key={type} type={type} items={this.state.results[type].items} />)}
      </div>
    )
  }
}

ReactDOM.render(<Results query='Swans' />, document.getElementById('results'))
