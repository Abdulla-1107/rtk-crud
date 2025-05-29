import { useDeleteUserMutation, useGetUsersQuery } from "../redux/api/user.api";
import {
  Button,
  Skeleton,
  Table,
  Popconfirm,
  notification,
  Avatar,
} from "antd";
import type { TableProps } from "antd";
import { useCallback, useState } from "react";
import ModalWrapper from "../components/model/Modal";
import { IoTrashOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

export interface DataType {
  id: string;
  name: string;
  profession: string;
  createdAt: string;
  surname: string;
  age: number;
  phone: string;
  avatar?: string; // Added avatar field
}

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState<null | DataType>(null);
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setUpdateUser(null);
  }, []);

  const handleUpdateUser = (user: DataType) => {
    setUpdateUser(user);
    showModal();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      api.success({
        message: "Student muvaffaqiyatli o'chirildi",
        placement: "bottomRight",
      });
    } catch (error) {
      api.error({
        message: "Xatolik yuz berdi",
        description: "Student o‘chirishda muammo yuz berdi",
        placement: "bottomRight",
      });
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <Avatar
          src={avatar}
          size={40}
          className="border-2 border-gray-200 rounded-full"
          alt="Student avatar"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (user) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Student o'chirish"
            description="Haqiqatan ham o'chirmoqchimisiz?"
            onConfirm={() => handleDelete(user.id)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button
              className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              icon={<IoTrashOutline className="text-lg" />}
            />
          </Popconfirm>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
            onClick={() => handleUpdateUser(user)}
            icon={<FiEdit3 className="text-lg" />}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center my-6">
          <h2 className="text-2xl font-bold text-gray-800">Students</h2>
          <Button
            className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 px-4 py-2 rounded-md"
            onClick={showModal}
          >
            Add Student
          </Button>
        </div>
        {isLoading ? (
          <Skeleton active className="p-4 bg-white rounded-lg shadow" />
        ) : (
          <Table<DataType>
            rowKey={"id"}
            columns={columns}
            dataSource={data}
            className="bg-white rounded-lg shadow"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>

      {isModalOpen && (
        <ModalWrapper
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          updateUser={updateUser}
        />
      )}

      {contextHolder}
    </div>
  );
};

export default Home;
