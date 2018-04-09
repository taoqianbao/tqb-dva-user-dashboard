import { connect } from 'dva';

function App() {
  return <div>App</div>;
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps)(App);


