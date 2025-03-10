import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { getUserProfile } from "../../services/getUserProfile";
import { setNewUserProfile } from "../../services/setNewUserProfile";
import { useForm } from "@tanstack/react-form";
import { MyProfileTypes } from "../../types";
import { Form, Input, Button, Typography, Card } from "antd";

function MyProfile() {
  const { token, userId } = useAuth();
  const [profile, setProfile] = useState<MyProfileTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !token) return;
    getUserProfile(userId, token)
      .then(setProfile)
      .catch(() => setError("Failed to load profile"));
  }, [token, userId]);

  const form = useForm({
    defaultValues: {
      name: profile?.name || "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (!profile || !token || !userId) return;
      setError(null);
      setSuccess(null);

      try {
        const data = await setNewUserProfile(
          token,
          userId,
          value.name,
          value.password
        );
        setProfile((prev) => (prev ? { ...prev, ...data } : null));
        setSuccess("Profile updated successfully!");
        form.reset();
      } catch {
        setError("Error updating profile.");
      }
    },
  });

  if (!profile) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <Typography.Title
        level={2}
        className="text-gray-200">
        My Space Profile
      </Typography.Title>

      <Typography.Text className="text-gray-400">
        <strong>User ID:</strong> {profile.user_id}
      </Typography.Text>

      {success && (
        <Typography.Paragraph type="success">{success}</Typography.Paragraph>
      )}
      {error && (
        <Typography.Paragraph type="danger">{error}</Typography.Paragraph>
      )}

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
          <Form.Item label="User name">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  value.length < 3
                    ? "Username must be at least 3 characters long"
                    : undefined,
              }}>
              {(field) => (
                <>
                  <Input
                    id="name"
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

          <Form.Item label="New password">
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.length < 6
                    ? "Password must be at least 6 characters long"
                    : undefined,
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={!canSubmit}>
                {isSubmitting ? "..." : "Update Profile"}
              </Button>
            )}
          />
        </Form>
      </Card>
    </div>
  );
}

export default MyProfile;
