# Project Machine Learning - Finding Page Type

## Objective

The objective of this project is trying to guess the source of a .html page, using just the data inside the page. 

The files are inside the directory `./archives` splited between each type of file for test purpouses, like staff folder for example, and inside then there is a folder with each university the page is from, like cornell university.

## About the project behavior

This README is only to give a overview about the project. Click on the links below to get all the docs, explaining how the project works, the data that is being handled etc.

## Running

First install all node dependencies
```
npm install
```

Then if you want to parse the files you should run one of the following commands

```
# If you want to build the json file
$ npm run build

# If you want to build the csv file
$ npm run build:csv

```

## Contributing

To maitain a code quality a linter was added, so after each change on the code you should run the following command, to assure that you code is respecting the rules.

```
gulp lint
```

## Authors

* **Caio Henrique Roman Rodriguez** 
* **Gabriel Thaler** 
* **Leonardo Pavan Rocha** 
* **Matheus Barreto Nunes de Aguiar** 
