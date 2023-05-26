# CSC 317 Course Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               |              Information              |
| :-----------: | :-----------------------------------: |
| Student Name  | Kullathon "Mos" Sitthisarnwattanachai |
|  Student ID   |               921425216               |
| Student Email | ksitthisarnwattanachai@mail.sfsu.edu  |



# Build/Run Instructions

## Build Instructions
1. `cd` into `applications/` folder.
2. Create `.env` file with the following variables:
```env
DB_HOST="localhost"
DB_NAME="csc317db"
DB_USER="root"
DB_PASSWORD="317"
PORT=3000
```
3. Install dependencies
```sh
npm i
```
4. Set up database
```sh
npm run builddb
```

## Run Instructions
From `applications` folder, run
```sh
npm run start
```
