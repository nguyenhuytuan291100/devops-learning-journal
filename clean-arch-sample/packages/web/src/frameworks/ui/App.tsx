import { Button, Input, List, Typography, Tag, Space, App as AntApp } from "antd";
import { useState } from "react";
import { useTasks } from "../../adapters/presenters/useTasks";

export default function App() {
  const { items, loading, add, complete } = useTasks();
  const [title, setTitle] = useState("");
  const { message } = AntApp.useApp();

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <Typography.Title level={2}>Tasks (Clean Architecture)</Typography.Title>
      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input
          placeholder="New task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onPressEnter={async () => { if (title.trim().length >= 3) { await add(title); setTitle(""); } }}
        />
        <Button type="primary" onClick={async () => {
          if (title.trim().length < 3) return message.error("At least 3 chars");
          await add(title); setTitle("");
        }}>Add</Button>
      </Space.Compact>

      <List
        loading={loading}
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="done" disabled={item.done} onClick={() => complete(item.id)}>Complete</Button>
            ]}
          >
            <List.Item.Meta
              title={
                <Space>
                  <Typography.Text delete={item.done}>{item.title}</Typography.Text>
                  {item.done ? <Tag color="green">done</Tag> : <Tag>open</Tag>}
                </Space>
              }
              description={new Date(item.createdAt).toLocaleString()}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
