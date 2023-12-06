import { Modal, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { EditIssue, IssueBook, get_id_by_email } from "../../../apicalls/issues";

function IssueForm({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
  selectedIssue,
  type,
}) {
  const { user } = useSelector((state) => state.users);
  const [validated, setValidated] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [patronData, setPatronData] = useState(null);
  const [patronId, setPatronId] = React.useState(
    type === "edit" ? selectedIssue.user._id : ""
  );
  const [patronEmail, setPatronEmail] = useState("");
  const [returnDate, setReturnDate] = React.useState(
    type === "edit" ? moment(selectedIssue.returnDate).format("YYYY-MM-DD") : ""
  );
  const dispatch = useDispatch();

  const validate = async () => {
    try {
      dispatch(ShowLoading());


      const response = await get_id_by_email({ email: patronEmail });
      if (response.success) {
        if (response.userId && response.role === "patron") {
          setPatronData(response);
          setPatronId(response.userId)
          setValidated(true);
          setErrorMessage("");
        } else {
          setValidated(false);
          setErrorMessage("This user is not a patron");
        }
      } else {
        setValidated(false);
        setErrorMessage(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setValidated(false);
      setErrorMessage(error.message);
    }
  };

  const onIssue = async () => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type !== "edit") {
        console.log(patronId)
        response = await IssueBook({
          book: selectedBook._id,
          user: patronId,
          issueDate: new Date(),
          returnDate,
          rent:
            moment(returnDate).diff(moment(), "days") *
            selectedBook?.rentPerDay,
          fine: 0,
          issuedBy: user._id,
        });
      } else {
        response = await EditIssue({
          book: selectedBook._id,
          user: patronData._id,
          issueDate: selectedIssue.issueDate,
          returnDate,
          rent:
            moment(returnDate).diff(moment(), "days") *
            selectedBook?.rentPerDay,
          fine: 0,
          issuedBy: user._id,
          _id: selectedIssue._id,
        });
      }
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
        setPatronId("");
        setReturnDate("");
        setValidated(false);
        setErrorMessage("");
        setSelectedBook(null);
        setOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  useEffect(() => {
    if (type === "edit") {
      validate();
    }
  }, [open]);


  return (
    <Modal
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-secondary font-bold text-xl uppercase text-center">
          {type === "edit" ? "Edit / Renew Issue" : "Issue Book"}
        </h1>
        <div>
          <span>Patron Email </span>
          <input
            type="email"
            value={patronEmail}
            onChange={(e) => setPatronEmail(e.target.value)}
            placeholder="Patron Email"
            disabled={type === "edit"}
          />
        </div>
        <div>
          <span>Return Date </span>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeholder="Return Date"
            min={moment().format("YYYY-MM-DD")}
          />
        </div>

        {errorMessage && <span className="error-message">{errorMessage}</span>}

        {validated && (
          <div className="bg-secondary p-1 text-white">
            <h1 className="text-sm">Patron : {patronData.name}</h1>
            <h1>
              Number Of Days : {moment(returnDate).diff(moment(), "days")}
            </h1>
            <h1>Rent per Day : {selectedBook.rentPerDay}</h1>
            <h1>
              Rent :{" "}
              {moment(returnDate).diff(moment(), "days") *
                selectedBook?.rentPerDay}
            </h1>
          </div>
        )}

        <div className="flex justify-end gap-2 w-100">
          <Button
            title="Cancel"
            variant="outlined"
            onClick={() => setOpen(false)}
          />
          {type === "add" && (
            <Button
              title="Validate"
              disabled={patronEmail === "" || returnDate === ""}
              onClick={validate}
            />
          )}
          {validated && (
            <Button
              title={type === "edit" ? "Edit" : "Issue"}
              onClick={onIssue}
              disabled={patronEmail === "" || returnDate === ""}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default IssueForm;
