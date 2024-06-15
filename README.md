# To Do List
A standard to-do list with user authentication using MongoDB, Express, Pug, Passport.js, and Docker. Made in June 2020 with the goal of learning the MVC architecture and SSR. 

I have revisited it since to update packages, address security vulnerabilities, etc. to ensure it will still run. As of June 2024, I updated the project to run in a Docker container, with the minor addition of my [camper animation](https://github.com/cayb0rg/camper-animation), which you can now find on the homepage.

![camper](https://github.com/cayb0rg/to-do-list/assets/46247315/36c8fa23-fb43-4612-9092-8149ea8bfbde)

While it may say "A place to plan your next best trip", do not be fooled. This is only a to do list:

![image](https://github.com/cayb0rg/to-do-list/assets/46247315/16126d0e-424b-4bc3-9e19-ceb257ec5f65)

# Deployment

1. Create a local or remote MongoDB instance (learn more [here](https://www.mongodb.com/basics/create-database))

2. If you create a local MongoDB instance, you must edit ``app.js``:

Comment the line

```
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
```
Uncomment the line
```
mongoose.connect('mongodb://mongo:27017/[database_name_here]', {useNewUrlParser: true, useUnifiedTopology: true );
```

2. Clone this git repository:

```
$ git clone git@github.com:cayb0rg/to-do-list.git
```
3. Run the command:
```
$ docker-compose up
```

