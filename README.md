# earwig
earwig is a reviews platform for construction workers. It shows which agencies and workplaces can be trusted.

Production version: https://earwig-work.herokuapp.com/
Dev version: https://earwig-app.herokuapp.com/

## Tech Stack
Some of the tech stack we've used: 

| Core | Testing/Other | Other |
| - | -------- | -------- |
|Node|jest|babel
|Express|supertest| 
|React|eslint|axios
|MongoDB|react-testing-library|serve-favicon|
|HTML|nodemon|env2|
|CSS|travis|react-select|
|Styled-Components|codecov|bcryptjs|
|ChartJS|prettier|concurrently
|Firestore|sweetalert||

## Getting Started
How to get a copy of the project up and running on your local machine.

*Please ensure you have this software **installed and running** on your local machine **before** you attempt to run this webapp.*
> **Node** (via nvm recomended)
> see: https://github.com/creationix/nvm

> **MongoDB**
> see: https://docs.mongodb.com/manual/installation/

### Setup

#### 1. Clone the repo:
```
$ git clone https://github.com/yalla-coop/earwig.git
```
#### 2. Install Dependencies 
```
$ npm run init:both
```

#### 3. Get Mongo running on your local computer
Connect to mongo in a separate terminal tab/window.
```
$ mongod
```

#### 4. Add some more Environment Variables
Create a `.env` file in the root.

Add these👇 lines to the file, to make your local databases work, inserting your own psql username and password.
```
mongoURI= mongodb://localhost:27017/earwig
mongoURI_TEST= mongodb://localhost:27017/earwig_TEST
```
Add a 'Secret' for password encryption.
```
SECRET = "[SOMETHING SECRET]"
```

For full details on environment variables please speak to one of the admin of this codebase

#### 5. Build the Database
Use this script that runs the dummy data build to set up your survey questions and put in some inital dummy data
```
$ npm run build:data
```

#### 6. Run the Tests
To make sure everything is working as it should.

```
$ npm test
```

#### 7. Run the Server
```
$ npm run dev:both
```
Wait for a `compiled successfully` message.

#### 8. Have Fun
The webapp should now be running on
```localhost:3000```
Now you can play with the code all you like 🎉

If you notice anything wrong with the instructions or the project isn't running as expected don't hesitate to raise an issue and we'll try to figure it out.
