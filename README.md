# To-Do App with Next.js, Prisma and SQLite

This project is a to-do list application built with **Next.js** and **Prisma**, using **SQLite** as the database.

## Technologies Used

- **Next.js**: Framework for React that facilitates the development of web applications.
- **Prisma**: ORM (Object Relational Mapping) to work with databases in an easy and efficient way.
- **SQLite**: Lightweight and simple database, used to store tasks.

## Features

- Create a task list
- Edit a task list
- Delete a task list
- Create tasks
- Mark tasks as completed
- Delete tasks

## Requirements

Before starting, you need to have Node.js installed on your machine. You can download Node.js from the [official website](https://nodejs.org/).

## How to run the project locally

### Step 1: Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/renanrcp16/nextjs-to-do
```

### Step 2: Install the dependencies

Enter the project folder and install the dependencies:

```
cd <repository-name>
npm install
```

### Step 3: Configure your environment

Configure your .env file based on .env.example

### Step 4: Generate the database

Run the command below to generate the SQLite database using Prisma:

```
npx prisma db push
```

### Step 5: Run the project

Now you can run the application locally:

```
npm run dev
```

## How the database works

The database is created in SQLite format and managed through the Prisma. When you run the migration command, the database will be generated in the project root as dev.db. It stores the application tasks with the following fields:

List:

- id: Unique identifier of the task.
- description: Description of the task.

List item:

- id: Unique identifier of the task.
- description: Description of the task.
- finished: Status of the task (completed or not).

## Thanks

Thanks for using this project! If you have any problems or suggestions, feel free to open an issue.
