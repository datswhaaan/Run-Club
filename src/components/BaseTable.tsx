import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ColumnConfig } from '../types/column';
// import Pagination from '@mui/material/Pagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface BaseTableProps<T extends Record<string, unknown>, IdKey extends keyof T = keyof T> {
  data: T[];
  idKey?: IdKey;
  columns: ColumnConfig<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (id: T[IdKey]) => void;
}

export default function BaseTable<T extends Record<string, unknown>, IdKey extends keyof T = keyof T>({
  data,
  idKey = 'id' as IdKey,
  columns,
  onEdit,
  onDelete,
}: BaseTableProps<T, IdKey>) {
  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 3}}
    >
      <Table sx={{ tableLayout: 'fixed', minWidth: 650 }} aria-label="dynamic table" >
        <TableHead>
          <StyledTableRow>
            {columns.map((col) => (
              <StyledTableCell 
                key={String(col)}
                width={col.width}
              >
                {col.label}
              </StyledTableCell>
            ))}
            {(onEdit || onDelete) && (
              <StyledTableCell width={120} />
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow key={idKey ? String(row[idKey]) : i}>
              {columns.map((col) => (
                <StyledTableCell
                  key={String(col.key)}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {String(row[col.key] ?? '')}
                </StyledTableCell>
              ))}
              {(onEdit || onDelete) && (
                <StyledTableCell key="actions" align='right'>
                  {onEdit && (
                    <IconButton color="secondary" aria-label="edit" onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton color="error" aria-label="delete" onClick={() => onDelete(row[idKey])}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination count={10} color='primary'/> */}
    </TableContainer>
  );
}