import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// project import
import Dot from 'components/@extended/Dot';

// Comparator functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'appName', align: 'left', disablePadding: true, label: 'Name' },
  // { id: 'appCode', align: 'left', disablePadding: false, label: 'Code' },
  { id: 'appDesc', align: 'left', disablePadding: false, label: 'Description' },
  { id: 'appStatus', align: 'left', disablePadding: false, label: 'Status' },
  { id: 'appUrl', align: 'left', disablePadding: false, label: 'URL' },
  { id: 'action', align: 'right', disablePadding: false, label: 'Action' }
];

// Table Head Component
function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

// Status Component
function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 'Inactive':
      color = 'warning';
      title = 'Pending';
      break;
    case 'Active':
      color = 'success';
      title = 'Active';
      break;
    case 'Rejected':
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired
};

// Main Table Component
export default function OrderTable({ data, onUpdate, onDelete }) {
  const order = 'asc';
  const orderBy = 'id';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.id}</Link>
                  </TableCell>
                  <TableCell>{row.appName}</TableCell>
                  {/* <TableCell align="left">{row.appCode}</TableCell> */}
                  <TableCell align="left">{row.appDesc}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.appStatus} />
                  </TableCell>
                  <TableCell align="left">
                    {row.appUrl}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => onUpdate(row.id)}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => onDelete(row.id)}
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      appName: PropTypes.string.isRequired,
      // appCode: PropTypes.string.isRequired,
      appDesc: PropTypes.string.isRequired,
      appStatus: PropTypes.string.isRequired,
      appUrl: PropTypes.string.isRequired
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
