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

interface BaseTableProps<T extends Record<string, unknown>> {
  data: T[];
  idKey?: keyof T;
  hiddenKeys?: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function BaseTable<T extends Record<string, unknown>>({
  data,
  idKey = 'id' as keyof T,
  hiddenKeys = [],
  columnLabels,
  onEdit,
  onDelete,
}: BaseTableProps<T>) {
  const excludedKeys = new Set([idKey, ...hiddenKeys]);
  
  const columns = data.length > 0
    ? (Object.keys(data[0]) as (keyof T)[]).filter((col) => !excludedKeys.has(col))
    : [];

  const getLabel = (col: keyof T) =>
    columnLabels?.[col] ?? String(col).charAt(0).toUpperCase() + String(col).slice(1);

  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 3}}
    >
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table" >
        <TableHead>
          <StyledTableRow>
            {columns.map((col) => (
              <StyledTableCell key={String(col)}>
                {getLabel(col)}
              </StyledTableCell>
            ))}
            {(onEdit || onDelete) && (
              <StyledTableCell align="center">Actions</StyledTableCell>
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <StyledTableCell
                  key={String(col)}
                  component={colIndex === 0 ? 'th' : 'td'}
                  scope={colIndex === 0 ? 'row' : undefined}
                >
                  {String(row[col])}
                </StyledTableCell>
              ))}
              {(onEdit || onDelete) && (
                <StyledTableCell key="actions">
                  {onEdit && (
                    <IconButton color="secondary" aria-label="edit" onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton color="error" aria-label="delete" onClick={() => onDelete(row)}>
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