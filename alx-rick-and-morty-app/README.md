# Error Handling with Error Boundaries

This project demonstrates the implementation of Error Boundaries in a Next.js + TypeScript environment.  
The tasks build up step-by-step from creating an ErrorBoundary to testing it with a component that intentionally throws an error, and finally integrating an error monitoring service.

---

## 📌 Task 0: Project Setup
**Objective**  
Scaffold a Next.js project with TypeScript support.

**Steps**
1. Duplicate the starter project.  
2. Install dependencies:  
   ```bash
   npm install
Start the development server:
npm run dev
Visit http://localhost:3000 to confirm setup.
📌 Task 1: Implement ErrorBoundary
Objective
Create a reusable ErrorBoundary component to catch JavaScript errors in child components.
Implementation
File: components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button onClick={this.handleReset}>Try again?</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
📌 Task 2: Create a Component to Test ErrorBoundary
Objective
Develop a simple component that intentionally throws an error to test the ErrorBoundary functionality.
Implementation
File: components/ErrorProneComponent.tsx

import React from 'react';

const ErrorProneComponent: React.FC = () => {
  throw new Error('This is a test error!');
};

export default ErrorProneComponent;
Using it in a Page (pages/index.tsx)
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorProneComponent from '@/components/ErrorProneComponent';

const Home: React.FC = () => {
  return (
    <ErrorBoundary>
      <ErrorProneComponent />
    </ErrorBoundary>
  );
};

export default Home;
📌 Task 3: Monitor and Log Errors
Objective
Integrate an error monitoring service (Sentry) into the ErrorBoundary to log errors.
Implementation

Install Sentry SDK:
npm install @sentry/react @sentry/nextjs
Initialize Sentry in sentry.client.config.ts:
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-dsn-here.ingest.us.sentry.io/project-id",
  sendDefaultPii: true,
});
Update ErrorBoundary.tsx to report errors:
import * as Sentry from "@sentry/react";

componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}
Proof of Implementation
A screenshot from the Sentry dashboard (sentry-screenshot.png) is included in the project root.
It confirms that the error from ErrorProneComponent was successfully captured by Sentry.
🚀 How to Run
Start the dev server:
npm run dev
Open http://localhost:3000.
✅ Expected Behavior
If everything works correctly:
The ErrorProneComponent throws an error.
ErrorBoundary catches it and displays the fallback UI:
Oops, there is an error!
[Try again?]
Sentry logs the error, visible in its dashboard (see screenshot in root).