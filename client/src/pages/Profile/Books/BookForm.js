import { Col, Form, message, Modal, Row } from "antd";
import React, { useState } from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddBook, UpdateBook } from "../../../apicalls/books";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import logger from "../../../logger/logger";
function BookForm({
  open,
  setOpen,
  reloadBooks,
  setFormType,
  formType,
  selectedBook,
  setSelectedBook,
}) {
  const { user } = useSelector((state) => state.users);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      values.createdBy = user._id;
      if (imageFile) {
        // Convert image file to base64 string
        const base64Image = await getBase64(imageFile);
        values.image = base64Image;
      }

      let response = null;
      if (formType === "add") {
        values.availableCopies = values.totalCopies;
        response = await AddBook(values);
        logger.info("Adding Book: " + values.title + " " + response.success)
      } else {
        values._id = selectedBook._id;
        response = await UpdateBook(values);
        logger.info("Updating Book: " + values.title + " " + response.success)
      }
      if (response.success) {
        message.success(response.message);
        reloadBooks();
        setOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <Modal
      title={formType === "add" ? "Add Book" : "Update Book"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...selectedBook,
          publishedDate: selectedBook?.publishedDate
            ? new Date(selectedBook?.publishedDate).toISOString().split("T")[0]
            : null,
        }}
      >
        <Row gutter={[20]}>
          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input book title" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input book description" },
              ]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>



          <Col span={8}>
            <Form.Item
              label="Author"
              name="author"
              rules={[{ required: true, message: "Please input author name" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Publisher"
              name="publisher"
              rules={[
                { required: true, message: "Please input publisher name" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Published Date"
              name="publishedDate"
              rules={[
                { required: true, message: "Please input published date" },
              ]}
            >
              <input type="date" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input category" }]}
            >
              <select>
                <option value="">Select Category</option>
                <option value="Mythology">Mythology</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="Poetry">Poetry</option>
                <option value="Drama">Drama</option>
                <option value="History">History</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Rent Per Day"
              name="rentPerDay"
              rules={[{ required: true, message: "Please input rent per day" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Total Copies"
              name="totalCopies"
              rules={[{ required: true, message: "Please input total copies" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input image url" }]}
            >
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-2 mt-1">
          <Button
            type="button"
            variant="outlined"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default BookForm;