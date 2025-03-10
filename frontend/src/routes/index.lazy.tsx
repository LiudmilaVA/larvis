import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <h1>Welcome to LARVIS</h1>
      <p>This is a user-friendly API management tool.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

export default App;
