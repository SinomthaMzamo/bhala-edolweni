# Bhala Edolweni

**Bhala Edolweni** (meaning "write on the knee" in Xhosa/Zulu) is a debt management application designed to efficiently manage debtor data. This application comprises a command-line interface (CLI) in Python and a graphical user interface (GUI) in React, connecting to a Python (Flask, SQLAlchemy) through a RESTful API (Flask). It is currently undergoing brownfields development to migrate to the Kotlin ecosystem to improve scalability, efficiency and to leverage the adaptability provided by Kotlin Multiplatform (KMP)

## Table of Contents

1. [Core Features](#core-features)  
2. [Current Functionality](#current-functionality)  
   - [Command-Line Interface Program](#command-line-interface-program)  
   - [Graphical User Interface Program](#graphical-user-interface-program)  
3. [Future Development](#future-development)  
4. [Project Structure](#project-structure)  
   - [File Breakdown](#file-breakdown)  
5. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
6. [Contributing](#contributing)  
7. [License](#license) 

## Core Features

- **Add Entries**: Users can add new debtor entries.
- **View Entries**: The application allows users to view all existing entries and specific entries.
- **Update Entries**: The application allows users to update existing entries
- **Delete Entries**: The application allows users to delete settled debtor accounts

## Current Functionality

#### _Command Line Interface Program_

- **Add New Debtors**: Add new debtor entries through the command line using `bhala.py`.
- **Store Debtor Information**: Saves entries to a Relational database (`edolweni.db`).
- **Read and Display**: Displays all debtor entries from the database.
- **Update Entries**: The application allows users to update existing entries
- **Delete Entries**: The application allows users to delete settled debtor accounts

## Usage Example:

To add a new entry, run the script with the entry as a command-line argument:

```bash
python bhala.py "New Debtor Entry"
```

**Example:**
```bash
$ python bhala.py "debtor1-8"
$ python bhala.py "debtor2-5"
$ python bhala.py "debtor3-8"
```


## _Graphical User Interface Program_

- **View All Debtors**: Displays a table of all debtors, with columns for the debtor's name, amount owed, and the date. Each row includes icons for editing, deleting, and viewing debtor details.
- **CRUD Operations**: All CRUD operations (Create, Read, Update, Delete) are supported:
  - **Add New Debtor**: A form allows users to add new debtor entries, accessible via an 'Add New' button.
  - **Edit Debtor**: Existing debtor information can be edited directly in the table using the edit icon.
  - **Delete Debtor**: Settled debtors can be removed from the system using the delete icon next to each entry.
  - **View Debtor**: Click the view icon to view detailed information about a debtor.
- **Search Functionality**: The header includes a search bar to filter debtors by name.
- **Navigation**: A burger menu in the header allows easy access to additional features of the application.

### Usage:

- **Viewing Debtors**: The table of debtors will be displayed by default, showing all debtor records.
- **Adding a New Debtor**: Click the "Add New" button above the table, fill in the debtor's name and amount owed, and submit the form to add a new entry.
- **Editing a Debtor**: To edit a debtor's information, click the edit icon in the respective row, make the changes, and save them.
- **Deleting a Debtor**: To delete a debtor, click the delete icon in the respective row to remove the debtor's record from the system.
- **Search Debtors**: Use the search bar in the header to filter the debtors by name.


## Future Development

- **Kotlin CLI**: Transition the Python script to a Kotlin cli application.
- **Kotlin RESTful API**: The backend has been established using Python, Flask, and Flask SQLAlchemy to facilitate interaction with debtor data. This serves as a prototype for transitioning to a Kotlin-based backend in the future, enabling seamless access to data for both the GUI and CLI.
- **Edit Existing Debtor**: Upcoming functionality to update debtor information via GUI.
- **Settle Debtor**: Future feature to settle debts and remove them from the database via GUI.

## Project Structure


### File Breakdown 

###  `backend/`

1. **`app/`**  
   This directory contains the core logic of the application. Each module is focused on a specific aspect of the application.

   - **`data_models.py`**: Defines the data models for the application. These are used for interacting with the database, either via an ORM like SQLAlchemy or directly with SQL queries.
   - **`__init__.py`**: Marks this folder as a Python package, enabling imports from the `app` module in other parts of the project.
   - **`routes.py`**: Contains route definitions for the application (typically for Flask or FastAPI). This is where API endpoints are defined, and each route corresponds to a specific HTTP method (GET, POST, etc.).
   - **`services.py`**: Implements the business logic of the application. It includes functions that interact with data models, perform calculations, handle third-party API calls, or process user input.
   - **`service_tests.py`**: Includes tests for the service layer (in `services.py`). Unit tests or integration tests are written here to ensure the application logic behaves correctly.

2. **`__init__.py` (Root Directory)**  
   This is another initialization file, marking the root of the project as a Python package. This file is usually empty but required for certain imports or setups.

3. **`instance/`**  
   This folder contains configuration-specific files and runtime data. It's common to store the database or configuration files here, especially in a local or development environment.

   - **`edolweni.db`**: This is the database file, SQLite in this case. It stores your application’s data (e.g., user information).

4. **`main.py`**  
   The entry point of the application. This starts up the backend server.

---

### `frontend/`

This directory contains the code for the frontend, which is divided into two parts: the React GUI and the Python CLI.

#### `GUI/`: The React-based graphical user interface.

- **`public/`**: Contains the public-facing files like `index.html`, images, and other static assets.
- **`src/`**: Contains the source code for the React application.
  - **`components/`**: Reusable React components that make up the UI.
  - **`App.js`**: The main React component, which holds the layout and structure of the app.
  - **`index.js`**: The entry point that renders the React app into the `index.html` file.
  - **`api.js`**: Contains functions for making API requests to the backend (e.g., using `fetch` or `axios`).
- **`package.json`**: Contains project metadata, dependencies, and scripts for the React app.
- **`.gitignore`**: Specifies which files and directories Git should ignore (e.g., `node_modules/`, `.env`).

#### `CLI/`: A Python-based CLI (Command-Line Interface) for interacting with the application.

- **`src/`**: Contains the source code for the Python CLI application.
  - **`bhala.py`**: The main script for the CLI application, which includes functionality to manage debtors via an interactive command-line interface.

### Code Breakdown:

1. **API Integration**: The script interacts with a backend API (located at `http://127.0.0.1:5000`) to perform various debtor-related operations such as adding, viewing, updating, and deleting debtors.

   - **`add_debtor(name, amount)`**: Sends a POST request to add a new debtor with a specified name and amount.
   - **`view_all_debtors()`**: Sends a GET request to fetch and display all debtors along with their balances.
   - **`view_debtor(name)`**: Sends a GET request to view a specific debtor by their name.
   - **`update_debtor(name, amount, operation)`**: Sends a PUT request to update a debtor's balance (either increasing, decreasing, or setting a specific amount).
   - **`delete_debtor(name)`**: Sends a DELETE request to remove a debtor from the system.

2. **CLI Command Class (`EdolweniCLI`)**: The class inherits from Python's `cmd.Cmd` to provide an interactive command-line interface for managing debtors.

   - **Aliases**: Commands like `add`, `list`, `reduce`, `increase`, `set`, and `delete` have multiple aliases to allow flexibility in user input.
   - **Command Methods**:
     - **`do_add(self, arg)`**: Adds a debtor by parsing the name and amount from the argument.
     - **`do_list(self, arg)`**: Lists all debtors or views a specific debtor by name.
     - **`do_reduce(self, arg)`**: Reduces a debtor's balance.
     - **`do_increase(self, arg)`**: Increases a debtor's balance.
     - **`do_set(self, arg)`**: Sets a debtor's balance to a specific amount (overrides the current balance).
     - **`do_delete(self, arg)`**: Deletes a debtor from the system.
     - **`do_exit(self, arg)`**: Exits the CLI program.
   
   - **Command Aliases**: The `aliases` dictionary maps various alternate commands to their main functions, such as `+` for `add`, `--` for `reduce`, and `ls` for `list`.
   
3. **Error Handling**: The script handles errors gracefully, including issues with JSON decoding from the API response, invalid amounts, and missing arguments.

4. **Main Entry Point**:
   - When executed with arguments, the script will attempt to add a debtor and view all debtors. If the user wants to run the CLI interactively, they can type "run" when prompted.

### Example Usage:

1. **Add a Debtor**:
   ```bash
   (bhala-edolweni) add sinomtha mzamo-12
   
___

## Getting Started

### Prerequisites

- Python (v3.x or higher)
- Node.js (for React frontend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:SinomthaMzamo/bhala-edolweni.git
   cd bhala-edolweni
   ```
   
2. **Install Python dependencies for backend via requirements file**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Run the Python API:**
   ```bash
   cd backend
   python3 main.py 
   ```

4. **Install dependencies for the React frontend:**
   ```bash
   cd frontend/GUI
   npm install
   
   ```

5. **Run the Python CLI:**
   ```bash
   cd frontend/CLI/src
   python3 bhala.py "Your Entry Here"
   ```

6. **Start the React application:**
   ```bash
   npm run dev
   ```

7. **Open your browser** and navigate to `http://localhost:5173` to view the GUI.

## Contributing

Contributions are welcome! Please open issues or submit pull requests. For detailed guidelines on contributing, check the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [SinomthaMzamoProjects License](LICENSE). Please refer to the license file for more information.
