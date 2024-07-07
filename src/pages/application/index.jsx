// material-ui
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// ==============================|| APPLICATION PAGE ||============================== //

const columns = [
  { id: "APP_CODE", label: "App Code" },
  { id: "APP_NAME", label: "app Name" },
  { id: "APP_URL", label: "URL" },
  { id: "APP_STATUS", label: "Status" },
];

export default function Application({}) {
  return (
    <MainCard title="Application List">
      <Stack direction="row" spacing={2} sx={{justifyContent: "flex-end"}}>
        <Button variant="outlined" startIcon={<AddOutlinedIcon fontSize="large"/>}>
          Add Application
        </Button>
      </Stack>
      <TableContainer px={2}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{textAlign: "center"}}>
                Actions
              </TableCell>
              <TableBody>

              </TableBody>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
