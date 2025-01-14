## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tomasfreile/light-it.git
cd light-it
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion

## Design Decisions

### Architecture
- **App Router**: Next's App Router for better performance
- **Client-side State**: Zustand for its simplicity and efficient state management
- **Component Structure**: Modular components for better maintainability and reusability

### UI/UX
- **Healthcare-focused Design**: Used a color palette suitable for healthcare applications
- **Responsive Layout**: Mobile-first approach
- **Loading States**: Implemented skeleton loading for better user experience
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

