import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MembersPage from '../MembersPage/MembersPage';
import Tasks from '../Tasks/Tasks';
import '../common/Styles/Mixins/Tables/commonTableStyles.scss';
import './appContainer.scss';
import { RoleContext } from '../../contexts/RoleContext';
import { ThemeContext } from '../../contexts/ThemeContext';

class AppContainer extends React.PureComponent {
  render() {
    return (
      <RoleContext.Consumer>
        {({ role, signedUserId, signedUserName }) => (
          <ThemeContext.Consumer>
            {({ theme }) => (
              <div className={`${theme} appContainer`}>
                <div className='pagesContainer'>
                  <Switch>
                    <Route
                      path='/app/members'
                      render={(props) => (
                        <MembersPage
                          role={role}
                          theme={theme}
                          signedUserId={signedUserId}
                          signedUserName={signedUserName}
                          {...props}
                        />
                      )}
                    />
                    <Route path='/app/tasks' component={Tasks} />
                  </Switch>
                </div>
              </div>
            )}
          </ThemeContext.Consumer>
        )}
      </RoleContext.Consumer>
    );
  }
}

export default AppContainer;
