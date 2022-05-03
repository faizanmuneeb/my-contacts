import { CheckCircleRounded, Menu } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { Tag } from "../../models/tag.model";
import AppButton from "../AppButton/AppButton";
import Heading from "../Heading/Heading";
import InputBox from "../InputBox/InputBox";
import SubHeading from "../SubHeading/SubHeading";
import "./SideBarFilters.css";

const SideBarFilters = ({
  tags,
  setTags,
  onFiltersSubmit,
}: {
  tags: Tag[];
  setTags: Function;
  onFiltersSubmit: Function;
}) => {
  const [includedTags, setIncludedTags] = useState<any>({});
  const [excludedTags, setExcludedTags] = useState<any>({});
  const [minMessagesSent, setMinMessagesSent] = useState<number>();
  const [maxMessagesSent, setMaxMessagesSent] = useState<number>();
  const [minMessagesReceived, setMinMessagesReceived] = useState<number>();
  const [maxMessagesReceived, setMaxMessagesReceived] = useState<number>();

  const onTagIncluded = (tagName: string) => {
    const _includedTags = { ...includedTags };
    if (_includedTags[tagName]) {
      delete _includedTags[tagName];
    } else {
      _includedTags[tagName] = tagName;
    }
    setIncludedTags(_includedTags);
  };

  const onTagExcluded = (tagName: string) => {
    const _excludedTags = { ...excludedTags };
    if (_excludedTags[tagName]) {
      delete _excludedTags[tagName];
    } else {
      _excludedTags[tagName] = tagName;
    }
    setExcludedTags(_excludedTags);
  };

  const FilterTag = ({
    tag,
    onClick,
    showCheck,
  }: {
    tag: Tag;
    onClick: Function;
    showCheck: boolean;
  }) => (
    <div className='filter-tag' onClick={() => onClick()}>
      <div>{tag.name}</div>
      <div>{showCheck && <CheckCircleRounded sx={{ color: "#49a091" }} />}</div>
    </div>
  );

  return (
    <Box className='SideBarFilters'>
      <div className='filters-container'>
        <Grid container sx={{ m: 0, alignItems: "center" }}>
          <Grid item xs={1}>
            <Menu />
          </Grid>
          <Grid item xs={9}>
            <Heading>Audience</Heading>
          </Grid>
          <Grid item xs={2}>
            <SubHeading
              sx={{
                fontSize: 14,
                fontWeight: "900",
                color: "#ccc",
              }}
            >
              100 Contacts
            </SubHeading>
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <SubHeading>Include Tags:</SubHeading>
          <div className='filter-tags'>
            {tags.map((tag, index) => (
              <FilterTag
                tag={tag}
                key={tag.name}
                showCheck={includedTags[tag.name]}
                onClick={() => onTagIncluded(tag.name)}
              />
            ))}
          </div>
        </Box>
        <Box marginTop={2}>
          <SubHeading>Exclude Tags:</SubHeading>
          <div className='filter-tags'>
            {tags.map((tag, index) => (
              <FilterTag
                tag={tag}
                key={tag.name}
                showCheck={excludedTags[tag.name]}
                onClick={() => onTagExcluded(tag.name)}
              />
            ))}
          </div>
        </Box>
        <Box marginTop={2}>
          <SubHeading>Message Sent:</SubHeading>
          <Grid container marginY={1}>
            <Grid item xs={6}>
              <InputBox
                placeholder='Min'
                type='number'
                value={minMessagesSent}
                onChange={(value: number) => setMinMessagesSent(+value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputBox
                placeholder='Max'
                type='number'
                value={maxMessagesSent}
                onChange={(value: number) => setMaxMessagesSent(+value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box marginTop={2}>
          <SubHeading>Message Received:</SubHeading>
          <Grid container marginY={1}>
            <Grid item xs={6}>
              <InputBox
                placeholder='Min'
                type='number'
                value={minMessagesReceived}
                onChange={(value: number) => setMinMessagesReceived(+value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputBox
                placeholder='Max'
                type='number'
                value={maxMessagesReceived}
                onChange={(value: number) => setMaxMessagesReceived(+value)}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className='filters-button'>
        <AppButton
          label='Filters'
          onClick={() =>
            onFiltersSubmit({
              minMessagesReceived,
              minMessagesSent,
              maxMessagesReceived,
              maxMessagesSent,
              includedTags: Object.values(includedTags),
              excludedTags: Object.values(excludedTags),
            })
          }
        />
      </div>
    </Box>
  );
};

export default SideBarFilters;
