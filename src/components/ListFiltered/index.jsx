import { green } from '@mui/material/colors'
import Card from '../Card'
import styles from '../ItemListContainer/itemList.module.css'
import ProductList from '../ItemListContainer'


/** Funcion que sirve para realizar un filtro por genero  */

const ItemFilter = ({ productos , genre }) => {
    const productosFiltrados = productos.filter(producto => producto.genre.some(genero => genero === genre));
    return (
        <ProductList productos={productosFiltrados}/>
    )
}

export default ItemFilter