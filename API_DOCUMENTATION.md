
# **Bhala Edolweni Debtors Management API Documentation**

### **Base URL**
```
http://<your-domain>/api
```

---

## **Endpoints**

### **1. View All Debtors**
- **Endpoint**: `GET /view`
- **Description**: Retrieves a list of all debtors.
- **Request Parameters**: None
- **Response**:
  - **Status 200** (OK):
    ```json
    [
      {
        "name": "John Doe",
        "amount": 500
      },
      {
        "name": "Jane Smith",
        "amount": 1000
      }
    ]
    ```
  - **Status 500** (Internal Server Error):
    ```json
    {
      "error": "Unable to retrieve debtors"
    }
    ```

---

### **2. View a Specific Debtor**
- **Endpoint**: `GET /view/<name>`
- **Description**: Retrieves details for a specified debtor.
- **Path Parameters**:
  - `name` (string, required): The name of the debtor (URL encoded, e.g., `John%20Doe`).
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "name": "John Doe",
      "amount": 500
    }
    ```
  - **Status 404** (Not Found):
    ```json
    {
      "error": "Debtor not found"
    }
    ```

---

### **3. Update a Debtor**
- **Endpoint**: `PUT /update`
- **Description**: Updates the amount owed by a specified debtor.
- **Request Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "amount": 100,
    "operation": "add" 
  }
  ```
  - **Fields**:
    - `name` (string, required): The debtor's name.
    - `amount` (number, required): The amount to update.
    - `operation` (string, required): The type of operation (`add` or `subtract`).
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "message": "Debtor updated successfully",
      "debtor": {
        "name": "John Doe",
        "amount": 600
      }
    }
    ```
  - **Status 400** (Bad Request):
    ```json
    {
      "error": "All the fields 'name', 'operation' and 'amount' are required."
    }
    ```
  - **Status 404** (Not Found):
    ```json
    {
      "error": "Debtor not found"
    }
    ```

---

### **4. Delete a Debtor**
- **Endpoint**: `DELETE /delete/<name>`
- **Description**: Deletes a specified debtor from the system.
- **Path Parameters**:
  - `name` (string, required): The name of the debtor.
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "message": "Debtor deleted successfully"
    }
    ```
  - **Status 404** (Not Found):
    ```json
    {
      "error": "Debtor not found"
    }
    ```

---

### **5. Add a New Debtor**
- **Endpoint**: `POST /add`
- **Description**: Adds a new debtor with an initial amount.
- **Request Body (JSON)**:
  ```json
  {
    "name": "Jane Smith",
    "amount": 1000
  }
  ```
  - **Fields**:
    - `name` (string, required): The name of the debtor.
    - `amount` (number, required): The initial amount owed.
- **Response**:
  - **Status 201** (Created):
    ```json
    {
      "message": "Debtor added successfully",
      "debtor": {
        "name": "Jane Smith",
        "amount": 1000
      }
    }
    ```
  - **Status 400** (Bad Request):
    ```json
    {
      "error": "Debtor amount is required. And Debtor name is required."
    }
    ```

---

## **Error Handling**
- **Common Status Codes**:
  - `200`: Request successful.
  - `201`: Resource created successfully.
  - `400`: Bad request, usually due to missing or invalid parameters.
  - `404`: Resource not found.
  - `500`: Internal server error.

---

## **Usage Notes**
- Ensure all fields are correctly formatted and provided in the request body for `POST` and `PUT` operations.
- Use URL encoding for debtor names in endpoints requiring a path parameter.
- Handle errors gracefully by checking the returned status code and error message.

