# ReactHub

ReactHub is an react js frontend built for maintaining automation results for all suites in single place. This project uses mongoDB(GridFS) to store all results files with the help go api backend. Inorder to push the results to database, you ll have to make 2 api calls at end of every test execution, a) For testcase data eg: suite name, suite type, date etc with tescase count eg: failed passed skipped total etc.
b) For testcases result file html files or excel files or any other types are supported.
You can check this implementation in another sample project mentioned below:
https://github.com/ostandsouza/DockerWebAutomation

To checkout dependant GO Api backend project:
https://github.com/ostandsouza/GoApi-CI

To view react app visit:
https://react-hub.now.sh/

## Getting Started:

1) Download all npm depedancies

2) To connect to your mongo DB, specify mongoURL in .env confguration file
 eg: REACT_APP_MONGO_URL=mongodb://localhost:port/DB
 
3) Pull go Api project and run locally with help of go command.
eg: go run <file_name>

4) This Project has frontend(React). To run the project in local development machine use:
npm start

## Authors
Ostan Dsouza - Initial work


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
