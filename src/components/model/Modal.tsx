import React, { FC, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/user.api";
import { DataType } from "../../pages/Home";

type FieldType = {
  name?: string;
  surname?: string;
  age: Number;
  phone: string;
};

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  updateUser?: DataType | null;
}

const ModalWrapper: FC<Props> = ({ isModalOpen, handleCancel, updateUser }) => {
  const [form] = Form.useForm();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [editUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (updateUser) {
      form.setFieldsValue({
        name: updateUser.name,
        surname: updateUser.surname,
        age: updateUser.age,
        phone: updateUser.phone,
      });
    } else {
      form.resetFields();
    }
  }, [updateUser, form]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Form values:", values);
    try {
      if (updateUser) {
        console.log("Update request:", { id: updateUser.id, body: values });
        await editUser({ id: updateUser.id, body: values }).unwrap();
        message.success("Student updated successfully");
      } else {
        await createUser(values).unwrap();
        message.success("Student created successfully");
      }
      handleCancel();
      form.resetFields();
    } catch (error: any) {
      console.error("Failed to submit:", error);
      message.error(
        error?.data?.message || "Failed to save student. Please try again."
      );
    }
  };

  return (
    <Modal
      title={updateUser ? "Update student" : "Create student"}
      closable={true}
      open={isModalOpen}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      cancelButtonProps={{ disabled: updateUser ? updateLoading : isLoading }}
      footer={false}
      className="rounded-lg"
      bodyStyle={{ padding: "24px" }}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        initialValues={
          updateUser
            ? {
                name: updateUser.name,
                surname: updateUser.surname,
                age: updateUser.age,
                phone: updateUser.phone,
              }
            : {}
        }
        className="space-y-4"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter name"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter surname"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input
            type="number"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter age"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            type="text"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="+998 000 00 00"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={updateUser ? updateLoading : isLoading}
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 rounded-md py-2"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(ModalWrapper);
