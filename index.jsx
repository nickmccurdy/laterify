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

function mapStateToProps (state) {
  return { results: state }
}

var ConnectedResults = ReactRedux.connect(mapStateToProps)(Results)

function results (state = [], action) {
  return action.type === 'RECEIVE_RESULTS' ? action.results : state;
}

function fetchResults (query) {
  return (dispatch) => {
    return fetch('https://api.spotify.com/v1/search?type=artist,album,track,playlist&q=' + encodeURIComponent(query))
      .then((response) => response.json())
      .then((results) => dispatch({ type: 'RECEIVE_RESULTS', results }))
  }
}

var store = Redux.createStore(
  results,
  Redux.applyMiddleware(ReduxThunk.default)
)
store.dispatch(fetchResults('Swans'))

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <ConnectedResults />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
