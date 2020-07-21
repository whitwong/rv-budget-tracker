import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';


// List columns for table display
const columns = [
  { id: "purchase_date", label: "Purchase Date", minWidth: 100 },
  { id: "purchase_details", label: "Purchase Details", minWidth: 170 },
  { id: "location", label: "Location", midWidth: 150 },
  { id: "cost", label: "Cost ($)", midWidth: 100, format: (value) => value.toFixed(2) },
  // { id: "purchaser", label: "Purchaser", midWidth: 50 },
  { id: "category", label: "Category", midWidth: 100 }
]

export default function CollapsibleTable({ data, expanded, dataSelection }) {
  return(
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
            data.details[dataSelection] !== undefined 
              ?
            data.details[dataSelection].map(row => { 
              return (
                <TableRow key={row.cost+row.location}>
                  {columns.map(column => {
                    const value = row[column.id]
                    return(
                      <TableCell key={column.id}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
              :
            <h3>Please select a bar/sector to view data.</h3>
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  )
}