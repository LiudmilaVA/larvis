import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "../../providers/AuthProvider";
import { loginUser } from "../../services/loginUser";
import { Form, Input, Button, Typography, Card } from "antd";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { user_id: "", password: "" },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        const data = await loginUser(value.user_id, value.password);
        login(data.access, value.user_id);
        navigate({ to: "/users" });
      } catch {
        setError("Invalid credentials. Try again.");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <Typography.Title
        level={2}
        className="text-gray-200">
        Space Login Portal
      </Typography.Title>

      {error && <Typography.Text type="danger">{error}</Typography.Text>}

      <Card
        className="w-96 p-6 rounded-lg bg-gray-900 border border-gray-700 shadow-lg"
        style={{
          width: "50vw",
          maxWidth: "400px",
          minWidth: "280px",
          margin: "0 auto",
        }}>
        <Form
          layout="vertical"
          onFinish={form.handleSubmit}>
          <Form.Item label="User ID">
            <form.Field
              name="user_id"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? "User ID is required." : undefined,
              }}>
              {(field) => (
                <>
                  <Input
                    id="user_id"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <Typography.Text type="danger">
                      {field.state.meta.errors.join(", ")}
                    </Typography.Text>
                  )}
                </>
              )}
            </form.Field>
          </Form.Item>

          <Form.Item label="Password">
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? "Password is required." : undefined,
              }}>
              {(field) => (
                <>
                  <Input.Password
                    id="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <Typography.Text type="danger">
                      {field.state.meta.errors.join(", ")}
                    </Typography.Text>
                  )}
                </>
              )}
            </form.Field>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
