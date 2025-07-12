# AURA - Modern E-Commerce Storefront

![AURA E-Commerce Screenshot](./public/screenshot.png)

**Live Demo:** https://aura-ecommerce-project.vercel.app/

---

## 📖 Project Overview

AURA is a fully-featured, modern e-commerce storefront built as a resume project to demonstrate proficiency in front-end web development technologies. It showcases a clean, dark-themed, and responsive design, with a focus on a seamless user experience. The application is built from the ground up using React, Redux for state management, and Tailwind CSS for styling, all while fetching product data from a live API.

This project highlights the ability to build a complex, multi-page application with real-world features like dynamic product filtering, a persistent shopping cart, and interactive UI elements.

## ✨ Features

-   **Dynamic Product Catalog:** Products and categories are fetched asynchronously from the `dummyjson.com` API.
-   **Advanced Shop Page:**
    -   **Live Search:** Search for products across the entire catalog.
    -   **Category & Price Filtering:** Refine product results by category and a min/max price range.
    -   **Multiple Sort Orders:** Sort products by latest, price, or rating.
-   **Detailed Product View:** An interactive product detail page with an image gallery, quantity selector, and tabbed information for description, specs, and reviews.
-   **Persistent Shopping Cart:** Add/remove items and update quantities. The cart state is saved to `localStorage`, so it persists across browser sessions.
-   **Modern UI/UX:**
    -   Clean, beautiful, and consistent design system.
    -   Fully responsive layout for all devices.
    -   Subtle animations and hover effects for an engaging user experience.
-   **Static Pages:** Includes beautifully styled "About Us" and "Contact Us" pages with an embedded map.

## 🛠️ Tech Stack

-   **Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
-   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Routing:** [React Router DOM](https://reactrouter.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Font Awesome](https://fontawesome.com/)
-   **API:** [DummyJSON](https://dummyjson.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/itsVES4L/aura-ecommerce-project
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd aura-ecommerce-project
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
