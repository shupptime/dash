import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify'
import axios from 'axios';
import Select from '@mui/material/Select';
import { visuallyHidden } from '@mui/utils';

import useQuiosco from '../hooks/useQuiosco';
import { useRouter } from "next/router";

let aux = 'vacio'

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Productos...',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'price',
    },
    /*  {
         id: 'fat',
         numeric: true,
         disablePadding: false,
         label: 'Precio',
     }, */
    /* {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    }, */
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, categorias, productos } = props;
    const [age, setAge] = React.useState('');
    const [cuerpo, setCuerpo] = React.useState({ _id: '', title: '' });
    
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (

                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>


            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="categorias">categorias</InputLabel>
                        <Select
                            labelId="categorias"
                            id="demo-simple-select-standard"
                            onChange={(e) =>
                                setCuerpo({
                                    _id: e.target.value._id,
                                    title: e.target.value.title
                                })

                            }

                            label="Age"
                        >

                            {
                                categorias.map(categoria => (
                                    <MenuItem key={categoria._id} value={categoria}>{categoria.title}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


// TODO: Tabla Principal
export default function EnhancedTable({ categorias, productos, categoriaSelect }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [editProducto, setEditProducto] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const numSelected = 0;
    const [cuerpo, setCuerpo] = React.useState({ _id: '', title: '' });
    const { orderByCategory, ultProd, obtieneUltProd, auxCat, obtienUltCat  } = useQuiosco();
    //Inicia tabla com productos no seleccionado y luego al usar una categoria queda asignado al inicio del componente
    const [catSelect, setCatSelect] = React.useState(orderByCategory);
    const router = useRouter();

    console.log("inicia orderByCategory:", orderByCategory)
    
  
    const handleChanged = (e) => {
        setCuerpo({
            _id: e.target.value._id,
            title: e.target.value.title
        })

        let cat = [];
        productos.map((item) => {

            if (item.categoryId === e.target.value._id) {
                cat.push(item)
                // console.log("catSelect; ", catSelect)
                //setCatSelect(item)
            }

        })
        setCatSelect(cat)
        obtieneUltProd(e.target.value._id)

    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = productos.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, producto) => {
        const selectedIndex = selected.indexOf(producto.name);
        let newSelected = [];
        
        if (selected !== producto.name) {
            setEditProducto(producto)
            return setSelected(producto.name);
        } else {
            return setSelected([]);
        }

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleDelete = async (e) => {
        try {

            const res = await axios.delete("/api/productos/" + e._id);
            
            if (res.status === 204){
                obtieneUltProd(e.categoryId);
        
                setSelected([]);
                const {data} = await axios(`/api/productos`);
                
                let a = [];
                //encuentra el borrado ?
                data.map( item => {
                    if(item.categoryId === e.categoryId){
                        a.push(e) // no va item?
                    }
                })
                console.log("aa:", a)
                
                // filtra y devuelve los productos actuales
                let aux = [];
                console.log("deleee", orderByCategory)
                orderByCategory.map( i => {
                    if( i._id !== e._id) {
                        aux.push(i)
                    }
                })

                //Carga los ultimos productos actualizados
                console.log("aux:", aux)
                setCatSelect(aux)
                // obtieneUltProd(e.categoryId);
                console.log("delete ordercat", orderByCategory)
                toast.success('Producto eliminado!!');
                //console.log("selected", selected)
                
                setTimeout(() => {
                    return router.push(`/dashboard/productos`);
                  }, 2000)
                
            }
          
          } catch (error) {
            console.log("msg-delete:", error)
          }
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productos.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {/* <EnhancedTableToolbar numSelected={selected.length} categorias={categorias} productos={productos} /> */}

                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(numSelected > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }),
                    }}
                >
                    {selected.length > 0 ? (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            1 selected
                        </Typography>
                    ) : (

                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            choose a product...
                        </Typography>


                    )}

                    {selected.length > 0 ? (
                        <>
                            <Tooltip title="Delete">
                                <IconButton onClick ={ ()=> { handleDelete(editProducto)}}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton onClick={() => { router.push(`/dashboard/productos/${editProducto._id}/editProduct`) }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Filter list"> 
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="categorias">categorias</InputLabel>
                                <Select
                                    labelId="categorias"
                                    id="demo-simple-select-standard"
                                    onChange={(e) => handleChanged(e)}

                                    label="Age"
                                >

                                    {
                                        categorias.map(categoria => (
                                            <MenuItem key={categoria._id} value={categoria}>{categoria.title}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Tooltip>
                    )}
                </Toolbar>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={productos.length}
                        />
                        <TableBody>
                            {stableSort(catSelect, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((producto, index) => {
                                    const isItemSelected = isSelected(producto.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, producto)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={producto.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {producto.name}
                                            </TableCell>
                                            <TableCell align="right">{producto.price}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={productos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}

