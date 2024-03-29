import 'babel-polyfill';
import 'styles/styles.scss';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';

import { App, AppDirective } from 'components/app/app';
import { Tasks, TasksDirective } from 'components/tasks/tasks';
import { TaskForm, TaskFormDirective } from 'components/tasks/task-form/task-form';
import { TaskItem, TaskItemDirective } from 'components/tasks/task-item/task-item';

import { escapeDirective } from 'directives/escape-directive';
import { focusDirective } from 'directives/focus-directive';

import { apiMiddleware } from 'modules/api/middleware';
import * as taskActions from 'modules/tasks/actions';
import { taskReducer } from 'modules/tasks/reducer';
import { routerConfig } from 'router';


let app = angular.module('app', [
    ngRedux,
    uiRouter
  ])

  .factory('apiMiddleware', apiMiddleware)
  .value('taskActions', taskActions)

  .controller('App', App)
  .directive('app', AppDirective)

  .controller('Tasks', Tasks)
  .directive('tasks', TasksDirective)

  .controller('TaskForm', TaskForm)
  .directive('taskForm', TaskFormDirective)

  .controller('TaskItem', TaskItem)
  .directive('taskItem', TaskItemDirective)

  .directive('escape', escapeDirective)
  .directive('focus', focusDirective)

  .config(['$ngReduxProvider', $ngReduxProvider => {
    $ngReduxProvider.createStoreWith(combineReducers({
      tasks: taskReducer
    }), ['apiMiddleware']);
  }])

  .config(routerConfig);


angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
