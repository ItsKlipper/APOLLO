# React Revolut 🛒💳

Welcome to the React Revolut project! This is a simple e-commerce application where you can add products to your cart and proceed to payment. Follow the instructions below to get started.

## Getting Started 🚀

### Prerequisites 📋

Make sure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

### Installation 📦

1. Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the `server` directory and install dependencies:
    ```bash
    cd React-Revolut/react-revolut/server
    npm install
    ```

3. Navigate to the `react-revolut` directory and install dependencies:
    ```bash
    cd ../
    npm install
    ```

### Running the Application 🚴‍♂️

1. Open a terminal and navigate to the `server` directory:
    ```bash
    cd React-Revolut/react-revolut/server
    ```

2. Start the server:
    ```bash
    node server.js
    ```

3. Open another terminal and navigate to the `react-revolut` directory:
    ```bash
    cd React-Revolut/react-revolut
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and go to:
    ```
    http://localhost:3000/
    ```

### Using the Application 🛍️

1. **Add Products to Cart** 🛒
    - Browse the available products and add them to your cart.

2. **Proceed to Payment** 💳
    - Once you are satisfied with the products in your cart, click on the "Proceed to Payment" button.

3. **Payment Page** 📝
    - Fill in all the fields on the payment page.
    - Click on the "Generate Order ID" button or paste an existing order ID.
    - The "Pay" button will become active.

4. **Make Payment** 💵
    - Click on the "Pay" button to open the payment pop-up.
    - Enter the credit card number and name of the holder.
    - If the payment returns an error, the pop-up will close and you will need to generate a new order ID because the previous order has the status "Failed".
    - Generate a new order ID and try the payment again with the correct card information.
    - If the payment is successful, you will be redirected to the main page where you can repeat the process.

## Troubleshooting 🛠️

- If you encounter any issues, make sure to check the console for errors.
- Ensure that both the server and the development server are running.

## Contributing 🤝

Feel free to fork this repository and make your own changes. Pull requests are always welcome! For major changes, please open an issue first to discuss what you would like to change.

## License 📄

This project is licensed under the MIT License.