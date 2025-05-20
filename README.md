# Technical Test - My Todo App

## Description

To get started with this technical test, please follow these steps:

1. Fork this repository to your own GitHub account
2. Clone your forked repository locally
3. Implement the required features in your fork
4. Once completed, submit your solution by sharing the link to your forked repository

This technical test involves implementing a TODO application API that will be consumed by the my-todo-app frontend. The API should provide the following functionalities:

### Required Features

- Create new TODO items
- List all TODO items
- Delete TODO items

### Technical Requirements

- RESTful API design
- JSON responses

### API Endpoints

#### GET /api/todos

- Returns a list of all TODO items
- Response format:

```json
{
  [
    {
      "id": "string",
      "title": "string",
      "completed": boolean,
      "description": "string"
    }
  ]
}
```

#### POST /api/todos

- Creates a new TODO item
- Request body:

```json
{
  "title": "string",
  "description": "string",
  "completed": boolean,
}
```

#### DELETE /api/todos/:id

- Deletes a TODO item

### Flexibility and Potential Enhancements

There are no strict restrictions on the implementation. The goal is to demonstrate your knowledge and skills. Here are some suggestions for potential enhancements:

#### Backend Enhancements
- Implement a database (e.g., MongoDB, PostgreSQL, MySQL)
- Add user authentication and authorization
- Implement data validation and error handling
- Add pagination for the todo list
- Implement sorting and filtering capabilities
- Add categories or tags for todos
- Implement due dates and reminders
- Add search functionality

#### Frontend Enhancements
- Add a modern UI framework (e.g., Material-UI, Tailwind CSS)
- Implement drag-and-drop functionality for reordering todos
- Add dark/light theme support
- Implement real-time updates using WebSocket
- Add animations and transitions
- Implement responsive design for mobile devices
- Add keyboard shortcuts
- Implement undo/redo functionality

Feel free to implement any of these suggestions or come up with your own ideas to showcase your skills!
