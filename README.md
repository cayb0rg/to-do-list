# To Do List
A simple to do list made with MongoDB, Express, Pug, and Passport.js

# Deployment

1. Create a local or remote MongoDB instance (learn more [here](https://www.mongodb.com/basics/create-database))

2. If you create a local MongoDB instance, you must edit ``app.js``:

Comment the line

```
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
```
Uncomment the line
```
mongoose.connect('mongodb://localhost/ToDoListAPI', {useNewUrlParser: true, useUnifiedTopology: true });
```

2. Clone this git repository:

```
$ git clone git@github.com:cayb0rg/to-do-list.git
```
3. Run the command:
```
$ npm start
```
