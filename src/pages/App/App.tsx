import {
  AddCircle,
  CheckCircle,
  CircleOutlined,
  Search,
} from "@mui/icons-material";
import { Checkbox, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
  const [filters, setFilters] = useState<any>({});
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [myContacts, setMyContacts] = useState<Contact[]>([]);
  const [myTags, setMyTags] = useState<Tag[]>([]);
  const timeout = useRef<any>();

  useEffect(() => {
    (async () => {
      const contacts = await getContacts();
      const tags = await getTags();
      setMyContacts(contacts);
      setMyTags(tags);
    })();

    return () => {};
  }, []);

  const onFiltersSubmit = async (filters: any) => {
    setFilters(filters);
    const queryParams = {
      minMessagesRecv: filters.minMessagesReceived || 0,
      minMessagesSent: filters.minMessagesSent || 0,
      maxMessagesRecv: filters.maxMessagesReceived || 0,
      maxMessagesSent: filters.maxMessagesSent || 0,
      q: filters.search || "",
      tags: filters.includedTags || [],
      notTags: filters.excludedTags || [],
    };
    const contacts = await getContacts(queryParams);
    setMyContacts(contacts);
  };

  const onSearch = (value: string) => {
    setSearchFilter(value);

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      onFiltersSubmit({ ...filters, search: value });
    }, 250);
  };
  return (
    <Grid container className='App'>
      <Grid item xs={4}>
        <SideBarFilters
          tags={myTags}
          setTags={setMyTags}
          onFiltersSubmit={(value: any) =>
            onFiltersSubmit({ ...value, search: searchFilter })
          }
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
              onChange={onSearch}
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
            {myContacts.map((contact) => (
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
