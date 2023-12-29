import { Button, Flex, Form, Input } from "antd";
import { register } from "../api";

export const RegisterPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ maxWidth: 500, padding: 20, width: "100%", flex: 1 }}
    >
      <Form onFinish={(values) => register(values)}>
        <Form.Item name="username" label="Имя">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Пароль">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
