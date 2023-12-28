import { Button, Flex, Form, Input, Modal, Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import type { Player } from "../../types";
import { createPlayer, deletePlayer, editPlayer, getPlayers } from "../api";

export const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player>();

  const columns: ColumnsType<Player> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Имя",
    },
    {
      key: "actions",
      title: "Действия",
      render: (_, p) => (
        <Space>
          <Button
            onClick={() => {
              setEditingPlayer(p);
              setOpenCreateModal(true);
            }}
          >
            Изменить
          </Button>
          <Button
            onClick={() =>
              deletePlayer(p.id).then(() =>
                setPlayers(players.filter((pl) => pl.id != p.id))
              )
            }
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getPlayers()
      .then((data) => setPlayers(data))
      .catch(() => message.error("Не удалось получить список игроков"));
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="center" style={{ marginTop: 8 }}>
        <Button onClick={() => setOpenCreateModal(true)} type="primary">
          Добавить игрока
        </Button>
      </Flex>
      <Modal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        destroyOnClose
        title={editingPlayer ? "Редактировать игрока" : "Добавить игрока"}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            if (editingPlayer) {
              editPlayer({
                id: editingPlayer.id,
                name: values.name,
              }).then((data: Player) => {
                setPlayers(
                  players.map((p) => {
                    if (p.id === data.id) {
                      return data;
                    }
                    return p;
                  })
                );
                setEditingPlayer(undefined);
              });
            } else {
              createPlayer(values).then((data) =>
                setPlayers([...players, data])
              );
            }
            setOpenCreateModal(false);
          }}
          initialValues={{
            name: editingPlayer?.name,
          }}
        >
          <Form.Item name="name" label="Имя">
            <Input />
          </Form.Item>
          {/* <Form.Item name="team" label="Команда">
            <Select>
              {teams.map((team) => (
                <Select.Option key={team.id}>{team.name}</Select.Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {editingPlayer ? "Редактировать" : "Добавить"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={players} columns={columns} rowKey="id" />
    </Space>
  );
};
