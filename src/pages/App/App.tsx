import {
  AddCircle,
  CheckCircle,
  CircleOutlined,
  Search,
} from "@mui/icons-material";
import { Checkbox, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { createNull } from "typescript";
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
  const [nextPage, setNextPage] = useState<string>("");
  const timeout = useRef<any>();

  const contactsListRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    const el = contactsListRef.current;
    if (el && el.scrollHeight <= el.offsetHeight + el.scrollTop) {
      if (nextPage) {
        const contacts = await fetchContacts({
          page: encodeURI(nextPage),
        });
        setMyContacts([...myContacts, ...contacts]);
      }
    }
  };

  useEffect(() => {
    const el = contactsListRef.current;
    el?.removeEventListener("scroll", handleScroll);
    el?.addEventListener("scroll", handleScroll);
  }, [nextPage]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchContacts = async (queryParams: object) => {
    const { contacts, nextPage } = await getContacts(queryParams);
    setNextPage(nextPage);
    return contacts;
  };

  const fetchInitialData = async () => {
    const contacts = await fetchContacts({});
    setMyContacts(contacts);
    const tags = await getTags();
    setMyTags(tags);
  };

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
    const contacts = await fetchContacts(queryParams);
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
          <div className='my-contacts' ref={contactsListRef}>
            {myContacts.map((contact, index) => (
              <div key={contact.id}>
                <MyContact contact={contact} selectAll={selectAll} />
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
