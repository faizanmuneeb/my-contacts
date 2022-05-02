import {
  AddCircle,
  CheckCircle,
  CircleOutlined,
  Search,
} from "@mui/icons-material";
import { Checkbox, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppButton from "../../components/AppButton/AppButton";
import Heading from "../../components/Heading/Heading";
import InputBox from "../../components/InputBox/InputBox";
import MyContact from "../../components/MyContact/MyContact";
import SideBarFilters from "../../components/SideBarFilters/SideBarFilters";
import { Contact } from "../../models/contact.model";
import { Tag } from "../../models/tag.model";
import { getContacts, getTags } from "../../services/contacts";
import "./App.css";

const App = () => {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [myContacts, setMyContacts] = useState<Contact[]>([]);
  const [myTags, setMyTags] = useState<Tag[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<{
    minMessagesReceived: number | undefined;
    minMessagesSent: number | undefined;
    maxMessagesReceived: number | undefined;
    maxMessagesSent: number | undefined;
  }>({
    minMessagesReceived: undefined,
    minMessagesSent: undefined,
    maxMessagesReceived: undefined,
    maxMessagesSent: undefined,
  });
  useEffect(() => {
    (async () => {
      const contacts = await getContacts();
      const tags = await getTags();
      setMyContacts(contacts);
      setMyTags(tags);
    })();

    return () => {};
  }, []);

  useEffect(() => {
    const includedTags = myTags.filter((tag) => tag.included);
    const excludedTags = myTags.filter((tag) => tag.excluded);
    const filteredContacts = myContacts.filter((myContact) => {
      return (
        myContact.name
          .toString()
          .toLowerCase()
          .indexOf(searchFilter.toLowerCase()) > -1 &&
        (filters.minMessagesSent === undefined ||
          filters.minMessagesSent <= myContact.messagesSent) &&
        (filters.minMessagesReceived === undefined ||
          filters.minMessagesReceived <= myContact.messagesReceived) &&
        (filters.maxMessagesSent === undefined ||
          filters.maxMessagesSent >= myContact.messagesSent) &&
        (filters.maxMessagesReceived === undefined ||
          filters.maxMessagesReceived >= myContact.messagesReceived) &&
        (includedTags.length === 0 ||
          myContact.tags.some((contactTag) =>
            includedTags.some(
              (includedTag) => includedTag.name === contactTag.name
            )
          )) &&
        (excludedTags.length === 0 ||
          !myContact.tags.some((contactTag) =>
            excludedTags.some(
              (excludedTag) => excludedTag.name === contactTag.name
            )
          ))
      );
    });

    setFilteredContacts(filteredContacts);

    return () => {};
  }, [searchFilter, myContacts, filters]);

  return (
    <Grid container className='App'>
      <Grid item xs={4}>
        <SideBarFilters
          tags={myTags}
          setTags={setMyTags}
          onFiltersSubmit={(filters: any) => {
            setFilters(filters);
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <div className='main-container'>
          <div className='main-header'>
            <Heading>All Contacts ({myContacts.length})</Heading>
            <AddCircle sx={{ color: "#49a091" }} fontSize={"large"} />
          </div>
          <div className='search-input-container'>
            <InputBox
              placeholder='Search contacts'
              startIcon={<Search sx={{ color: "#ccc" }} />}
              value={searchFilter}
              onChange={(value: string) => setSearchFilter(value)}
            />
          </div>
          <div className='select-all-container'>
            <div className='select-all'>
              <Checkbox
                checked={selectAll}
                onChange={(event) => setSelectAll(event.target.checked)}
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
              <Typography sx={{ fontWeight: 900 }}> Select All</Typography>
            </div>
            <div className='export-all-btn'>
              <AppButton label='Export All' onClick={() => {}} />
            </div>
          </div>
          <div className='my-contacts'>
            {filteredContacts.map((contact) => (
              <MyContact
                contact={contact}
                key={contact.id}
                selectAll={selectAll}
              />
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
