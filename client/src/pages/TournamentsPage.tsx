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
import { NavLink } from "react-router-dom";
import type { Team, Tournament } from "../../types";
import {
  createTournament,
  deleteTournament,
  editTournament,
  getTeams,
  getTournaments,
} from "../api";

export const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament>();

  const columns: ColumnsType<Tournament> = [
    {
      key: "name",
      dataIndex: "name",
      title: "Название",
    },
    {
      key: "teams",
      dataIndex: "teams",
      title: "Команды",
      render: (value) =>
        value?.map((p: Team) => <Tag key={p.id}>{p.name}</Tag>),
    },
    {
      key: "actions",
      title: "Действия",
      render: (_, t) => (
        <Space>
          <Button
            onClick={() => {
              setEditingTournament(t);
              setOpenCreateModal(true);
            }}
          >
            Изменить
          </Button>
          <Button
            onClick={() =>
              deleteTournament(t.id).then(() =>
                setTournaments(tournaments.filter((tour) => tour.id != t.id))
              )
            }
          >
            Удалить
          </Button>
          {/* <Button onClick={() => initBracket(t.id)}>Начать турнир</Button> */}
          <NavLink to={`/bracket/${t.id}`}>
            <Button>К сетке</Button>
          </NavLink>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getTournaments()
      .then((data) => setTournaments(data))
      .catch(() => message.error("Не удалось получить список турниров"));

    getTeams()
      .then((data) => setTeams(data))
      .catch(() => message.error("Не удалось получить список команд"));
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Flex justify="center" style={{ marginTop: 8 }}>
        <Button onClick={() => setOpenCreateModal(true)} type="primary">
          Добавить турнир
        </Button>
      </Flex>
      <Modal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        destroyOnClose
        title={editingTournament ? "Изменить турнир" : "Добавить турнир"}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            if (editingTournament) {
              editTournament({
                id: editingTournament.id,
                name: values.name,
                teams: teams.filter((p) =>
                  values.teams.includes(p.id.toString())
                ),
              }).then((data: Tournament) => {
                setTournaments(
                  tournaments.map((t) => {
                    if (t.id === data.id) {
                      return data;
                    }
                    return t;
                  })
                );
                setEditingTournament(undefined);
              });
            } else {
              createTournament(values).then((data) =>
                setTournaments([...tournaments, data])
              );
            }
            setOpenCreateModal(false);
          }}
          initialValues={{
            name: editingTournament?.name,
            teams: editingTournament?.teams.map((p) => p.id.toString()),
          }}
        >
          <Form.Item name="name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="teams" label="Команды">
            <Select mode="multiple">
              {teams.map((team) => (
                <Select.Option key={team.id}>{team.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {editingTournament ? "Изменить" : "Добавить"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={tournaments} columns={columns} rowKey="id" />
    </Space>
  );
};
