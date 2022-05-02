import { Box, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Contact } from "../../models/contact.model";
import { AddCircle, CheckCircle, CircleOutlined } from "@mui/icons-material";
import "./MyContact.css";

const MyContact = ({
  contact,
  selectAll,
}: {
  contact: Contact;
  selectAll: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    const randNo = Math.floor(Math.random() * 50);
    setImageUrl(`https://randomuser.me/api/portraits/men/${randNo}.jpg`);
  }, []);

  useEffect(() => {
    setIsSelected(selectAll);
  }, [selectAll]);

  const onContactSelectionChange = (checked: boolean) => {
    setIsSelected(checked);
  };

  return (
    <Box
      className='MyContact'
      onClick={() => onContactSelectionChange(!isSelected)}
    >
      <div className="contact-container">
        <div className='left-section'>
          <Checkbox
            checked={isSelected}
            onChange={(event) => onContactSelectionChange(event.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
            checkedIcon={<CheckCircle />}
            icon={<CircleOutlined />}
            sx={{
              color: "#b4bdcf",
              "&.Mui-checked": {
                color: "#b4bdcf",
              },
            }}
          />
          <img src={imageUrl} alt={contact.id + "-profile-image"} />
          <div>
            <div className='contact-name'>{contact.name}</div>
            <div className='contact-phone-number'>+62{contact.phoneNumber}</div>
          </div>
        </div>
        <AddCircle sx={{ color: "#49a091" }} fontSize={"large"} />
      </div>
      <hr />
    </Box>
  );
};

export default MyContact;
