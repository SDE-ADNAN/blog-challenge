# Blog Challenge

A **Next.js** blog application with a modern UI, responsive design, and a smooth developer experience.

---

## 🚀 Demo

- **Live Demo:** https://blog-challenge-brown.vercel.app/

---

## 📁 Project Structure

```
├── app/          # Next.js app directory
├── components/   # React components
│   ├── magicui/  # UI magic effects components
│   └── ui/       # Core UI components using shadcn/ui
├── constants/    # Application constants
├── contexts/     # React context providers
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── public/       # Static assets
└── types/        # TypeScript type definitions
```

---

## 🛠️ Tech Stack

- **Next.js 15+**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Jest & React Testing Library**
- **next-themes** (for dark mode support)
- **sonner** (for toasts & notifications)
- **shadcn/ui** ui components

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js 18+**
- **Yarn package manager**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SDE-ADNAN/blog-challenge.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd blog-challenge
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

4. **Start the development server:**

   ```bash
   yarn dev
   ```

5. **Open in your browser:**

   - Visit [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `yarn dev`        | Start development server   |
| `yarn build`      | Build production bundle    |
| `yarn start`      | Start production server    |
| `yarn test`       | Run tests                  |
| `yarn lint`       | Run ESLint                 |
| `yarn type-check` | Run TypeScript type checks |

---

## 🧪 Testing

This project uses **Jest** and **React Testing Library** for testing.

### Run tests:

```bash
yarn test
```

### Generate test coverage report:

```bash
yarn test --coverage
```

---