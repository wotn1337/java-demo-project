import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import type { Player, Team } from "../../types";
import { createTeam, deleteTeam, editTeam, getPlayers, getTeams } from "../api";

export const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team>();

  const columns: ColumnsType<Team> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Название",
    },
    {
      key: "players",
      dataIndex: "players",
      title: "Игроки",
      render: (value) =>
        value?.map((p: Player) => <Tag key={p.id}>{p.name}</Tag>),
    },
    {
      key: "actions",
      title: "Действия",
      render: (_, t) => (
        <Space>
          <Button
            onClick={() => {
              setEditingTeam(t);
              setOpenCreateModal(true);
            }}
          >
            Изменить
          </Button>
          <Button
            onClick={() =>
              deleteTeam(t.id).then(() =>
                setTeams(teams.filter((team) => team.id != t.id))
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
    getTeams()
      .then((data) => setTeams(data))
      .catch(() => message.error("Не удалось получить список команд"));

    getPlayers()
      .then((data) => setPlayers(data))
      .catch(() => message.error("Не удалось получить список игроков"));
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="center" style={{ marginTop: 8 }}>
        <Button onClick={() => setOpenCreateModal(true)} type="primary">
          Добавить команду
        </Button>
      </Flex>
      <Modal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        destroyOnClose
        title={editingTeam ? "Изменить команду" : "Добавить команду"}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            if (editingTeam) {
              editTeam({
                id: editingTeam.id,
                name: values.name,
                players: players.filter((p) =>
                  values.players.includes(p.id.toString())
                ),
              }).then((data: Team) => {
                setTeams(
                  teams.map((t) => {
                    if (t.id === data.id) {
                      return data;
                    }
                    return t;
                  })
                );
                setEditingTeam(undefined);
              });
            } else {
              createTeam(values).then((data) => setTeams([...teams, data]));
            }
            setOpenCreateModal(false);
          }}
          initialValues={{
            name: editingTeam?.name,
            players: editingTeam?.players.map((p) => p.id.toString()),
          }}
        >
          <Form.Item name="name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="players" label="Игроки">
            <Select mode="multiple">
              {players.map((player) => (
                <Select.Option key={player.id}>{player.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {editingTeam ? "Изменить" : "Добавить"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={teams} columns={columns} rowKey="id" />
    </Space>
  );
};
