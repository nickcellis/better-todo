<img width="391" alt="Screenshot 2024-08-29 at 14 41 24" src="https://github.com/user-attachments/assets/838f2b4e-8f03-47de-bece-c09e1242fa1c">
<img width="406" alt="Screenshot 2024-08-29 at 14 45 26" src="https://github.com/user-attachments/assets/2ddce985-d24c-404c-a23e-a5f78fb7cd8f">

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Application [INCOMPLETE!]


A lightweight desktop application with support for Windows and macOS, built using Tauri development tools, Next.js, and Rust.

Table of Contents
Getting Started

Prerequisites

Installation

Running the Development Server

Building the Application

Technologies Used

Contributing

License

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 or higher recommended)

Rust (latest stable version)

Tauri CLI

pnpm (or npm, yarn, bun)

Installation
Clone the repository:

bash
Copy
git clone https://github.com/your-username/your-repo-name.git
Navigate to the project directory:

bash
Copy
cd your-repo-name
Install dependencies:

bash
Copy
pnpm install
# or
npm install
# or
yarn install
# or
bun install
Running the Development Server
To start the development server, run:

bash
Copy
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
Open http://localhost:3000 in your browser to view the application. The page will auto-update as you make changes to the code.

Building the Application
To build the application for production, run:

bash
Copy
pnpm build
# or
npm run build
# or
yarn build
# or
bun build
This will create an optimized production build of your application.

To build the Tauri desktop application, run:

bash
Copy
pnpm tauri build
# or
npm run tauri build
# or
yarn tauri build
# or
bun tauri build
This will generate the desktop application binaries for Windows and macOS.

Technologies Used
Next.js - React framework for server-side rendering and static site generation.

Tauri - Framework for building lightweight, secure desktop applications.

Rust - Systems programming language used by Tauri for backend functionality.

Tailwind CSS - Utility-first CSS framework (if used).

Inter font - Optimized Google Font loaded using next/font.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.


