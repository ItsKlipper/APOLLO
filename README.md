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

2. Navigate to the `root` directory and install dependencies:
    ```bash
    cd React-Revolut/react-revolut/
    npm install
    ```

3. Navigate to the `react-revolut` directory and install dependencies:
    ```bash
    cd ../
    npm install
    ```

### Running the Application 🚴‍♂️

1. Open a terminal and navigate to the `root` directory:
    ```bash
    cd React-Revolut/react-revolut
    ```

2. Create and set .env variables with the secret API key and port to start the server (REACT_APP_PORT: 4000 //default port:
    ```bash
    (echo REACT_APP_PORT=XXXX & echo REVOLUT_API_KEY=XXX) > .env
    ```
    
    Alternatively, you can create a `.env` file locally in the `root` directory with the following variables:
    ```plaintext
    REACT_APP_PORT=XXXX
    REVOLUT_API_KEY=XXX
    ```
    Then while in the root directory you can start the server:
    ```bash
    node server.js
    ```
   
4. Open another terminal and navigate to the `react-revolut` directory:
    ```bash
    cd React-Revolut/react-revolut
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and go to:
    ```
    http://localhost:3000/
    ```

### Using the Application 🛍️

1. **Add Products to Cart** 🛒
    - Browse the available products and add them to your cart.
    - Here is an example image:

    ![Homepage](/public/homepage.png)
   
3. **Proceed to Payment** 💳
    - Once you are satisfied with the products in your cart, click on the "Proceed to Payment" button.
    - Here is an example image:

    ![CheckOut](/public/checkout.png)
4. **Payment Page** 📝
    - Fill in all the fields on the payment page.
    - Click on the "Generate Order ID" button or paste an existing order ID.
    - The "Pay" button will become active.
    - Here is an example image:

    ![Before Paying](/public/beforePaying.png)
5. **Make Payment** 💵
    - Click on the "Pay" button to open the payment pop-up.
    - Enter the credit card number and name of the holder.
    - If the payment returns an error, the pop-up will close and you will need to generate a new order ID because the previous order has the status "Failed".
    - If the payment process seems to be stuck, there is a mechanism in place that checks the payment status every 10 seconds. If the payment state remains unchanged after 30 seconds (i.e., the same state is detected in three consecutive checks), the payment process will be automatically closed, and you will need to try again.
    - Generate a new order ID and try the payment again with the correct card information.
    - If the payment is successful, you will be redirected to the main page where you can repeat the process.
    - Here is an example image:

    ![After Paying](/public/afterPaying.png)
   
## Troubleshooting 🛠️

- If you encounter any issues, make sure to check the console for errors.
- Ensure that both the server and the development server are running.

## Contributing 🤝

Feel free to fork this repository and make your own changes. Pull requests are always welcome! For major changes, please open an issue first to discuss what you would like to change.

## License 📄

This project is licensed under the MIT License.
