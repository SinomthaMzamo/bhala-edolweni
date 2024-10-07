# Bhala Edolweni

**Bhala Edolweni** (meaning "write on the knee" in Xhosa/Zulu) is a debt management application designed to efficiently manage debtor data. This application comprises a command-line interface (CLI) in Python and a graphical user interface (GUI) in React, connecting to a Kotlin backend (upcoming) through a RESTful API.

## Current Features

- **Add Entries**: Users can add new debtor entries via the command line or GUI.
- **View Entries**: The application allows users to read and view all existing entries.

## Current Functionality

#### _Command-Line Interface Program_

- **Add New Debtors**: Add new debtor entries through the command line using `bhala.py`.
- **Store Debtor Information**: Saves entries to a text file (`edolweni.txt`).
- **Read and Display**: Displays all debtor entries from the text file.

## Usage Example:

To add a new entry, run the script with the entry as a command-line argument:

```bash
python bhala.py "New Debtor Entry"
```

**Example:**
```bash
$ python bhala.py "debtor1-R8"
$ python bhala.py "debtor2-R5"
$ python bhala.py "debtor3-R8"
```

**Contents** of `edolweni.txt`:
```
debtor1-R8
debtor2-R5
debtor3-R8
```
##
#### _Graphical User Interface Program_

- **View All Debtors**: Displays a table of all debtors, including name, amount owed, and date.
- **Add New Debtor**: A form for adding new debtor entries to the system.
- **Store Debtor Information**: Saves entries in a JSON file (`debtors.json`).

## Usage:

- **Viewing Debtors**: Click on the "View All Debtors" tab to see the list of all debtors.
- **Adding a New Debtor**: Select the "Add New Debtor" tab, fill in the debtor's name and amount, then submit the form.
- **Editing and Settling Debtors**: These features are under development and will be added in future releases.

## Future Development

- **Kotlin CLI**: Transition the Python script to a Kotlin cli application.
- **Kotlin RESTful API**: A backend will be developed to facilitate interaction with debtor data, allowing both the GUI and CLI to access the data seamlessly.
- **Edit Existing Debtor**: Upcoming functionality to update debtor information, pending API implementation.
- **Settle Debtor**: Future feature to settle debts and remove them from the database.
- **Enhanced Data Management**: Transition to JSON for data storage and manipulation, improving backend and frontend integration.

## Project Structure

- **`bhala.py`**: Python script for managing debtor data via CLI.
- **`edolweni.txt`**: Text file for storing debtor entries.
- **`debtors.json`**: JSON file for storing debtor entries in the GUI.
- **React Frontend**: Contains all frontend components and routing for the GUI.

## Getting Started

### Prerequisites

- Python (v3.x or higher)
- Node.js (for React frontend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bhala-edolweni
   ```

2. **Install dependencies for the React frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the Python CLI:**
   ```bash
   python bhala.py "Your Entry Here"
   ```

4. **Start the React application:**
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000` to view the GUI.

## Contributing

Contributions are welcome! Please open issues or submit pull requests. For detailed guidelines on contributing, check the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [SinomthaMzamoProjects License](LICENSE). Please refer to the license file for more information.
