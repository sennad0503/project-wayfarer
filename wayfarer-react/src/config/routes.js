import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NewPostPage from '../pages/NewPostPage';
import NewComment from '../pages/NewComment';
import EditPostPage from '../pages/EditPostPage';
import ShowPage from '../pages/ShowPage';
import LoginPage from '../pages/LoginPage';

const routes = (
  <Switch>
    <Route exact path='/' >
      <HomePage />
    </Route>
    <Route exact path='/new' component={NewPostPage}>
    </Route>
    <Route exact path='/home' component={LoginPage}>
    </Route>
    <Route exact path='/new/comment' component={NewComment}>
    </Route>
    <Route exact path='/edit' component={EditPostPage}>
    </Route>
    <Route exact path='/show' component={ShowPage}>
    </Route>
  </Switch>
)

export default routes;