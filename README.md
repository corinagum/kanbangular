# Kanbangular
=====================
### [kanbangular.herokuapp.com](kanbangular.herokuapp.com)

> "The Kanban technique emerged in the late 1940s as Toyota’s reimagined approach to manufacturing and engineering. ... The system’s highly visual nature allowed teams to communicate more easily on what work needed to be done and when. It also standardized cues and refined processes, which helped to reduce waste and maximize value." - [via LeanKit.com](http://leankit.com/learn/kanban/kanban-board/)

## Introduction
Kanbangular is a kanban Single Page App co-created by Nick Cadiente and Corina Jacobson. This project utilizes Angular JS, bcrypt for password encryption, PostgreSQL, Sequelize, NodeJS, Express, SASS, and Gulp. Moment JS was utilized to provide date capabilities for due dates.
* [Nick Cadiente](https://github.com/ncadiente)

* [Corina Jacobson](https://github.com/corinajacobson)

## Installation
In order to run this app, please run the following in your terminal after cloning the project:

```bash
$ npm i
```
```
$ psql
```
```
$ CREATE DATABASE kanbangular
```
```
$ \q
```
```
$ nodemon server.js
```

This app does not have a seeder.

## User Guide
The deployed version of this app is available at [kanbangular.herokuapp.com](kanbangular.herokuapp.com).

1. First time users of this app should first create a login account to be able to post and edit tasks.
2. Click the register button and fill out all fields. If you already have an account, click login and enter your username and password.
3. Upon registering or logging in, you should be immediately redirected to the main page.
4. Create new tasks by entering information into the top task card. You may enter the name of the task, add further details, assign the task to someone, list the priority, and assign the due date of the task.
5. Edit previously made tasks by using the left and right chevrons to switch the task to different boards, or by clicking the delete icon to remove the task from the database.
6. You can logout by clicking the logout button in the navigation bar.
