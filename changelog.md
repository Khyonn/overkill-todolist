# [000] - Init

## Technical

- Create project
- Fix dependencies versions
- Enforce unit test coverage
- Add github actions

# [001] - List todos

## Business

- Define the layout for every pages
- Create page to list all todos
- Create a fallback page when url is not known (404)

## Technical

- Initialize todolist store
- Adding aliases to make import readable in tsconfig.json
- Adding an npm script to allow to run the application outside of virtual machine (port mapping)
- Adding testing helper to make tests easier (observable, lazyloading)

# [002] - Change a TODO state

## Business

- Allow user to update todo state ; if it became done, it will being placed as the last element

## Technical

- Renaming of todolist store actions
- Renaming business folder to business-domain
- Adding business rules for todos

# [003] - Detail a todo

## Business

- Allow user to see details of a todo

## Technical

- Change store shape : using @ngrx/entities to manage list

# [004] - Create a new todo

## Business

- Allow user to create a new todo (via Dialog)
