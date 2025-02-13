import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Typography, useTheme } from "@mui/material";

import { tokens } from "../../theme";
import { mockDataCustomers } from "../../data/mockData";
import Header from "../../components/Header";
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: "تاثیر تغذیه سالم",
 text: "پرواضح است که مصرف مواد غذایی برای عملکرد صحیح بدن بسیار حیاتی است",
    joinDate: randomCreatedDate(),

  },
  {
    id: randomId(),
    name: "بررسی تاثیر رژیم غذایی بر سلامت زنان",
 text:"چاقی در دوران کودکی به عنوان یکی از معضلات مهم بهداشتی در جوامع مختلف شناخته شده است",
    joinDate: randomCreatedDate(),

  },
  {
    id: randomId(),
    name: "علل چاقی کودکان",
 text:"چاقی در دوران کودکی به عنوان یکی از معضلات مهم بهداشتی در جوامع مختلف شناخته شده است",
    joinDate: randomCreatedDate(),

  },
  {
    id: randomId(),
    name: "نقش تغذیه در پیشرفت تحصیلی ",
 text:"تغذیه یکی از ارکان خواب می باشد. همه انسانها برای تامین انرژی بدن جهت انجام",
    joinDate: randomCreatedDate(),

  },
  {
    id: randomId(),
    name: "تاثیر تغذیه بر خواب ",
 text:"تغذیه یکی از ارکان اصلی تامین انرژی بدن می باشد. همه انسانها برای تامین انرژی بدن جهت انجام",
    joinDate: randomCreatedDate(),

  },
];



export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"  >
      <List >
        <div className="form-child">
          <form onSubmit={addTodo} className="all-todos">
            <input type="text" className="user-input" maxLength="40" placeholder='عنوان محتوا' value={userinput} onChange={todoTitleHandler} />
            <textarea className="user-input" maxLength="40" placeholder='متن محتوا' value={usertext} onChange={emailh} />
            <button type="submit" className="user-input" onClick={toggleDrawer(anchor, false)}>
              ثبت محتوا
            </button>    </form>
        </div>

      </List>

    </Box>
  );

  function addTodo(event) {
    event.preventDefault()
    if (userinput, usertext) {

      var today = new Date()
 var   date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let obj = {
        id: rows.length+1,
        name: userinput,
       text: usertext,
       joinDate:date
      }
      Swal.fire({
        title: '!محتوا جدید اضافه شد',
        text: '',
        icon: "success",
        confirmButtonText: 'تایید'
      })

      setUserinput('')
      setusertext('')


      setRows(prevState => {
        return [...prevState, obj]
      })
    }
    else {
      alert('تمامی فیلد ها را پر نمایید')
      setUserinput('')
      setusertext('')

    }
  }
  function todoTitleHandler(event) {
    setUserinput(event.target.value)
  }
  function emailh(event) {
    setusertext(event.target.value)
  }
  const [userinput, setUserinput] = useState('');
  const [usertext, setusertext] = useState('');

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ویرایش',

      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }, {
      field: 'text',
      headerName: "جزئیات محتوا",

    
      align: 'right',
      headerAlign: 'right',
      editable: true,width: 550
    },

    {
      field: 'joinDate',
      headerName: 'تاریخ',
      type: 'date',
      width: 150,
      editable: true,
      align: 'right',
      headerAlign: 'right',
    }, 

    { field: 'name', headerName: "عنوان محتوا",  editable: true, width: 300,   align: 'right',
      headerAlign: 'right',},
  

  ];

  return (<>
    <Box m="20px">
      <Header title="" subtitle="لیست  همه محتواها" className="ff" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }} >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}

          slotProps={{
            toolbar: { setRows, setRowModesModel },

          }}

          pageSize={8}
        />





      </Box>    </Box>
    <div className="form-child">
      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} variant="contained" className="vvv">محتوا جدید +</Button>
            <Drawer anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div></>
  );
}
