import React, { useEffect } from "react";
import { message, Modal, Table } from "antd";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import Button from "../../../components/Button";
import logger from "../../../logger/logger";

function IssuedBooks({ showIssuedBooks, setShowIssuedBooks, selectedUser }) {
  const [issuedBooks, setIssuedBooks] = React.useState([]);
  const dispatch = useDispatch();
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        user: selectedUser._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        logger.info("Books issue,Success");
        setIssuedBooks(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      logger.info("Books issue,failed " + error.message);
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Book",
      dataIndex: "book",
      render: (book) => book.title,
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Return Date (Due Date)",
      dataIndex: "returnDate",
      render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Rent",
      dataIndex: "rent",
    },
    {
      title: "Fine",
      dataIndex: "fine",
    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY hh:mm A");
        } else {
          return "Not Returned Yet";
        }
      },
    },
  ];
  return (
    <Modal
      open={showIssuedBooks}

      onCancel={() => setShowIssuedBooks(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-secondary mb-1 text-xl text-center font-bold uppercase">
        {selectedUser.name}'s Issued Books
      </h1>

      <Table columns={columns} dataSource={issuedBooks} />
    </Modal>
  );
}

export default IssuedBooks;
