# TodoApp

This is a TODO project generated with Vue 3 and Vuex for state management.

List of features:

TodoiTem:

* [x] Clicking the checkbox marks the todo as complete by updating its completed property value .
* [x]  Double-clicking on the todo item label activates editing mode.
* [x] Hovering over the todo shows the remove button.
* [x] When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title. The edit should be saved on: blur event and enter key press.
* [x] Check if the input is empty.

* [ ] If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.
* [x]Displays the number of active todos in a pluralized form. Make sure the number is wrapped by
a tag. Also make sure to pluralize the item word correctly.

* [x]Removes completed todo’s when clicked. Should be hidden when there are no completed todos.

* [x]When the route changes, the todo list should be filtered on a model level and the selected class on the filter links should be toggled. When an item is updated while in a filtered state, it should be updated accordingly. E.g. if the filter is Active and the item is checked, it should be hidden. Make sure the active filter is persisted on reload.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
