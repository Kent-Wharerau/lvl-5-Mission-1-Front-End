# Car Type Identifier Frontend

This is a simple React frontend that allows users to upload an image of a vehicle. The image is sent to a backend API, which returns a predicted vehicle type using Azure Custom Vision.

## Features

- Uploads an image using a form
- Displays prediction results from a backend API
- Shows loading and error states
- Clean layout with CSS modules

## Getting Started

### 1. Install dependencies

npm install

### 2. Run the development server

npm run dev

The app will be available at:

```
http://localhost:5173
```

> Note: Ensure your backend is running at `http://localhost:5000`

## How It Works

- Users select an image file via an upload form.
- The image is sent as a `POST` request to `http://localhost:5000/predict`.
- The response is parsed, and the top predicted vehicle type is displayed.
- If there's an error, a message is shown to the user.
