import { useAuth } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getUsersWithToken } from "../../services/getUsersWithToken";
import { Table, Spin, Alert, Typography } from "antd";

const { Title, Paragraph } = Typography;

function Users() {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      token
        ? getUsersWithToken(token)
        : Promise.reject(new Error("Token is required")),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error fetching users"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <>
      <Title level={2}>Users List</Title>
      <Paragraph>Manage your profile and view users.</Paragraph>

      {data?.length > 0 ? (
        <Table
          dataSource={data}
          columns={[
            { title: "ID", dataIndex: "user_id", key: "user_id" },
            { title: "Name", dataIndex: "name", key: "name" },
          ]}
          rowKey="user_id"
          pagination={false}
          style={{
            width: "50vw",
            maxWidth: "400px",
            minWidth: "280px",
            margin: "0 auto",
          }}
        />
      ) : (
        <Alert
          message="No users found."
          type="info"
          showIcon
        />
      )}
    </>
  );
}

export default Users;
