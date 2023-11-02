import React, {useState} from 'react';
import {
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  ListItemText,
  Box,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '412px',
    },
  },
};



const SelectCheckbox = ({
  name ='',
  setName = '',
  options
}: {
  name?: '' | any,
  setName?: any,
  options?: any
}) => {
  const [isRotated, setRotated] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof name>) => {
    const {
      target: { value },
    } = event;
    setName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setRotated(!isRotated);
  };

  const handleSelectDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div>
      <FormControl>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={name}
          onChange={handleChange}
          onDoubleClick={handleSelectDoubleClick}
          renderValue={(selected: any) => selected.join(', ')}
          MenuProps={MenuProps}
          onClick={handleSelectClick}
          IconComponent={() => null}
          sx={{
            width: '410px',
            '& .MuiMenu-paper': {
              overflowY: 'hidden',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #EFF1F6',
              borderRadius: '12px'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #131316',
              
            },
            '& .MuiOutlinedInput-input': {
              backgroundColor: '#EFF1F6',
            },
            '&.Mui-focused .MuiOutlinedInput-input': {
              backgroundColor: 'transparent',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #131316',
            },
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {options.map((data:any) => (
            <MenuItem key={data} value={data} onClick={handleMenuItemClick}>
              <Checkbox checked={name.indexOf(data) > -1} />
              <ListItemText primary={data} />
            </MenuItem>
          ))}
        </Select>
        <Box
          component="img"
          src="/assets/icons/expand-more-1.svg"
          sx={{
            position: 'absolute',
            top: 14,
            right: 12,
            width: 20,
            height: 20,
            cursor: 'pointer',
            transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg',
            transition: 'transform 0.4s ease',
            filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
          }}
        />
      </FormControl>
    </div>
  );
};

export default SelectCheckbox;
