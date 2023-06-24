import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto ] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const [productosAux, setProductoAux] = useState([])
    const [orderByCategory, setOrd] = useState([])
    const [ultProd, setUltProd] = useState([])
    const [auxCat, setAuxCat]= useState([])

    let lista = 0 ;

    const router = useRouter()

    const obtienUltCat = async (idCat)=> {
      const {data} = await axios(`/api/categorias`); 
       
      let a =[];
      
      data.map( e => {
        if(e._id === idCat){
          a.push(e)   
        }
    })
    
    setAuxCat(a)

    }
    //Obtiene productos de la ultima categoria seleccionada.
    const obtieneUltProd = async (idCat) => {
      try {
        const {data} = await axios(`/api/productos`); 
        let a =[];

        data.map( e => {
          if(e.categoryId === idCat){
            a.push(e)   
          }
        })
      obtienUltCat(idCat)
      setUltProd(a)
  
      } catch (error) {
        console.log("message: ", error)
      }
    }
    
    const obtenerProdPoCatActual = async () => {
      try {
        const { data } = await axios('/api/productos');
        //console.log("ultProd.length: ", ultProd.length)

        if(ultProd.length > 0){
          return setOrd(ultProd)
        }
        return setOrd(data)
        } catch (error) {
          console.error(error)
        }
    }

    const obtenerCategorias = async () => {
        try {
        const { data } = await axios('/api/categorias')
       /*  const data = [
            { 
            id: 1,
              icono: "cafe",
              nombre: "Café"
            },
            {
              id: 2,
              icono: "hamburguesa",
              nombre: "Hamburguesas"
            },
            {
              id: 3,
              icono: "pizza",
              nombre: "Pizzas"
            },
            {
              id: 4,
              icono: "dona",
              nombre: "Donas"
            },
            {
              id:5,
              icono: "pastel",
              nombre: "Pasteles"
            },
            {
              id: 6,
              icono: "galletas",
              nombre: "Galletas"
            }
        ] */

        setCategorias(data)
        } catch (error) {
          console.error(error)
        }
    }
    
    const obtenerProductoAux = async () => {
      try {
      const { data } = await axios('/api/productos')
      setProductoAux(data)
      } catch (error) {
        console.error(error)
      }
  }

    useEffect(() => {
        obtenerCategorias()
        obtenerProdPoCatActual()
    }, [ultProd])

    useEffect(() => {
      
        // setCategoriaActual(categorias[0])
        /* const productosAux = [
            {
                id: 1,
                nombre: "Café Caramel con Chocolate",
                precio: 59.9,
                imagen: "cafe_01",
                categoriaId: 1
              },
              {
                id: 2,
                nombre: "Café Frio con Chocolate Grande",
                precio: 49.9,
                imagen: "cafe_02",
                categoriaId: 1
              },
              {
                id: 3,
                nombre: "Latte Frio con Chocolate Grande",
                precio: 54.9,
                imagen: "cafe_03",
                categoriaId: 1
              },
              {
                id: 4,
                nombre: "Latte Frio con Chocolate Grande",
                precio: 54.9,
                imagen: "cafe_04",
                categoriaId: 1
              },
              {
                id: 5,
                nombre: "Malteada Fria con Chocolate Grande",
                precio: 54.9,
                imagen: "cafe_05",
                categoriaId: 1
              },
              {
                id: 6,
                nombre: "Café Mocha Caliente Chico",
                precio: 39.9,
                imagen: "cafe_06",
                categoriaId: 1
              },
              {
                id: 7,
                nombre: "Café Mocha Caliente Grande con Chocolate",
                precio: 59.9,
                imagen: "cafe_07",
                categoriaId: 1
              },
              {
                id: 8,
                nombre: "Café Caliente Capuchino Grande",
                precio: 59.9,
                imagen: "cafe_08",
                categoriaId: 1
              },
              {
                id: 9,
                nombre: "Café Mocha Caliente Mediano",
                precio: 49.9,
                imagen: "cafe_09",
                categoriaId: 1
              },
              {
                id: 10,
                nombre: "Café Mocha Frio con Caramelo Mediano",
                precio: 49.9,
                imagen: "cafe_10",
                categoriaId: 1
              },
              {
                id: 11,
                nombre: "Café Mocha Frio con Chocolate Mediano",
                precio: 49.9,
                imagen: "cafe_11",
                categoriaId: 1
              },
              {
                id: 12,
                nombre: "Café Espresso",
                precio: 29.9,
                imagen: "cafe_12",
                categoriaId: 1
              },
              {
                id: 13,
                nombre: "Café Capuchino Grande con Caramelo",
                precio: 59.9,
                imagen: "cafe_13",
                categoriaId: 1
              },
              {
                id: 14,
                nombre: "Café Caramelo Grande",
                precio: 59.9,
                imagen: "cafe_14",
                categoriaId: 1
              },
              {
                id: 15,
                nombre: "Paquete de 3 donas de Chocolate",
                precio: 39.9,
                imagen: "donas_01",
                categoriaId: 4
              },
              {
                id: 16,
                nombre: "Paquete de 3 donas Glaseadas",
                precio: 39.9,
                imagen: "donas_02",
                categoriaId: 4
              },
              {
                id: 17,
                nombre: "Dona de Fresa ",
                precio: 19.9,
                imagen: "donas_03",
                categoriaId: 4
              },
              {
                id: 18,
                nombre: "Dona con Galleta de Chocolate ",
                precio: 19.9,
                imagen: "donas_04",
                categoriaId: 4
              },
              {
                id: 19,
                nombre: "Dona glass con Chispas Sabor Fresa ",
                precio: 19.9,
                imagen: "donas_05",
                categoriaId: 4
              },
              {
                id: 20,
                nombre: "Dona glass con Chocolate ",
                precio: 19.9,
                imagen: "donas_06",
                categoriaId: 4
              },
              {
                id: 21,
                nombre: "Dona de Chocolate con MÁS Chocolate ",
                precio: 19.9,
                imagen: "donas_07",
                categoriaId: 4
              },
              {
                id: 22,
                nombre: "Paquete de 3 donas de Chocolate ",
                precio: 39.9,
                imagen: "donas_08",
                categoriaId: 4
              },
              {
                id: 23,
                nombre: "Paquete de 3 donas con Vainilla y Chocolate ",
                precio: 39.9,
                imagen: "donas_09",
                categoriaId: 4
              },
              {
                id: 24,
                nombre: "Paquete de 6 Donas",
                precio: 69.9,
                imagen: "donas_10",
                categoriaId: 4
              },
              {
                id: 25,
                nombre: "Paquete de 3 Variadas",
                precio: 39.9,
                imagen: "donas_11",
                categoriaId: 4
              },
              {
                id: 25,
                nombre: "Dona Natural con Chocolate",
                precio: 19.9,
                imagen: "donas_12",
                categoriaId: 4
              },
              {
                id: 26,
                nombre: "Paquete de 3 Donas de Chocolate con Chispas",
                precio: 39.9,
                imagen: "donas_13",
                categoriaId: 4
              },
              {
                id: 27,
                nombre: "Dona Chocolate y Coco",
                precio: 19.9,
                imagen: "donas_14",
                categoriaId: 4
              },
              {
                id: 28,
                nombre: "Paquete Galletas de Chocolate",
                precio: 29.9,
                imagen: "galletas_01",
                categoriaId: 6
              },
              {
                id: 29,
                nombre: "Paquete Galletas de Chocolate y Avena",
                precio: 39.9,
                imagen: "galletas_02",
                categoriaId: 6
              },
              {
                id: 30,
                nombre: "Paquete de Muffins de Vainilla",
                precio: 39.9,
                imagen: "galletas_03",
                categoriaId: 6
              },
              {
                id: 31,
                nombre: "Paquete de 4 Galletas de Avena",
                precio: 24.9,
                imagen: "galletas_04",
                categoriaId: 6
              },
              {
                id: 32,
                nombre: "Galletas de Mantequilla Variadas",
                precio: 39.9,
                imagen: "galletas_05",
                categoriaId: 6
              },
              {
                id: 33,
                nombre: "Galletas de sabores frutales",
                precio: 39.9,
                imagen: "galletas_06",
                categoriaId: 6
              },
              {
                id: 34,
                nombre: "Hamburguesa Sencilla",
                precio: 59.9,
                imagen: "hamburguesas_01",
                categoriaId: 2
              },
              {
                id: 35,
                nombre: "Hamburguesa de Pollo",
                precio: 59.9,
                imagen: "hamburguesas_02",
                categoriaId: 2
              },
              {
                id: 36,
                nombre: "Hamburguesa de Pollo y Chili",
                precio: 59.9,
                imagen: "hamburguesas_03",
                categoriaId: 2
              },
              {
                id: 37,
                nombre: "Hamburguesa Queso y  Pepinos",
                precio: 59.9,
                imagen: "hamburguesas_04",
                categoriaId: 2
              },
              {
                id: 38,
                nombre: "Hamburguesa Cuarto de Libra",
                precio: 59.9,
                imagen: "hamburguesas_05",
                categoriaId: 2
              },
              {
                id: 39,
                nombre: "Hamburguesa Doble Queso",
                precio: 69.9,
                imagen: "hamburguesas_06",
                categoriaId: 2
              },
              {
                id: 40,
                nombre: "Hot Dog Especial",
                precio: 49.9,
                imagen: "hamburguesas_07",
                categoriaId: 2
              },
              {
                id: 41,
                nombre: "Paquete 2 Hot Dogs",
                precio: 69.9,
                imagen: "hamburguesas_08",
                categoriaId: 2
              },
              {
                id: 42,
                nombre: "4 Rebanadas de Pay de Queso",
                precio: 69.9,
                imagen: "pastel_01",
                categoriaId: 5
              },
              {
                id: 43,
                nombre: "Waffle Especial",
                precio: 49.9,
                imagen: "pastel_02",
                categoriaId: 5
              },
              {
                id: 44,
                nombre: "Croissants De la casa",
                precio: 39.9,
                imagen: "pastel_03",
                categoriaId: 5
              },
              {
                id: 45,
                nombre: "Pay de Queso",
                precio: 19.9,
                imagen: "pastel_04",
                categoriaId: 5
              },
              {
                id: 46,
                nombre: "Pastel de Chocolate",
                precio: 29.9,
                imagen: "pastel_05",
                categoriaId: 5
              },
              {
                id: 47,
                nombre: "Rebanada Pastel de Chocolate",
                precio: 29.9,
                imagen: "pastel_06",
                categoriaId: 5
              },
              {
                id: 48,
                nombre: "Pizza Spicy con Doble Queso",
                precio: 69.9,
                imagen: "pizzas_01",
                categoriaId: 3
              },
              {
                id: 49,
                nombre: "Pizza Jamón y Queso",
                precio: 69.9,
                imagen: "pizzas_02",
                categoriaId: 3
              },
              {
                id: 50,
                nombre: "Pizza Doble Queso",
                precio: 69.9,
                imagen: "pizzas_03",
                categoriaId: 3
              },
              {
                id: 51,
                nombre: "Pizza Especial de la Casa",
                precio: 69.9,
                imagen: "pizzas_04",
                categoriaId: 3
              },
              {
                id: 52,
                nombre: "Pizza Chorizo",
                precio: 69.9,
                imagen: "pizzas_05",
                categoriaId: 3
              },
              {
                id: 53,
                nombre: "Pizza Hawaiana",
                precio: 69.9,
                imagen: "pizzas_06",
                categoriaId: 3
              },
              {
                id: 54,
                nombre: "Pizza Tocino",
                precio: 69.9,
                imagen: "pizzas_07",
                categoriaId: 3
              },
              {
                id: 55,
                nombre: "Pizza Vegetales y Queso",
                precio: 69.9,
                imagen: "pizzas_08",
                categoriaId: 3
              },
              {
                id: 56,
                nombre: "Pizza Pepperoni y Queso",
                precio: 69.9,
                imagen: "pizzas_09",
                categoriaId: 3
              },
              {
                id: 57,
                nombre: "Pizza Aceitunas y Queso",
                precio: 69.9,
                imagen: "pizzas_10",
                categoriaId: 3
              },
              {
                id: 58,
                nombre: "Pizza Queso, Jamón y Champiñones",
                precio: 69.9,
                imagen: "pizzas_11",
                categoriaId: 3
              }
          ] */
        
        // TODO: cambia porpiedad category y se hizo un state para productoAux  
        obtenerProductoAux()
        const productosEnCategoria = productosAux.filter( prod => prod.categoryId === categorias[0]._id)
        const data = { categoria: categorias[0], productos: productosEnCategoria }
        
        setCategoriaActual(data)  
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.price * producto.cantidad ) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        /* const productosAux = [
            {
                id: 1,
                nombre: "Café Caramel con Chocolate",
                precio: 59.9,
                imagen: "cafe_01",
                categoriaId: 1
              },
              {
                id: 2,
                nombre: "Café Frio con Chocolate Grande",
                precio: 49.9,
                imagen: "cafe_02",
                categoriaId: 1
              },
              {
                id: 3,
                nombre: "Latte Frio con Chocolate Grande",
                precio: 54.9,
                imagen: "cafe_03",
                categoriaId: 1
              },
              {
                id: 4,
                nombre: "Latte Frio con Chocolate Grande",
                precio: 54.9,
                imagen: "cafe_04",
                categoriaId: 1
              },
              {
                id: 5,
                nombre: "Malteada Fria con Chocolate Grande",
                precio: 54.9,
                imagen: "cafe_05",
                categoriaId: 1
              },
              {
                id: 6,
                nombre: "Café Mocha Caliente Chico",
                precio: 39.9,
                imagen: "cafe_06",
                categoriaId: 1
              },
              {
                id: 7,
                nombre: "Café Mocha Caliente Grande con Chocolate",
                precio: 59.9,
                imagen: "cafe_07",
                categoriaId: 1
              },
              {
                id: 8,
                nombre: "Café Caliente Capuchino Grande",
                precio: 59.9,
                imagen: "cafe_08",
                categoriaId: 1
              },
              {
                id: 9,
                nombre: "Café Mocha Caliente Mediano",
                precio: 49.9,
                imagen: "cafe_09",
                categoriaId: 1
              },
              {
                id: 10,
                nombre: "Café Mocha Frio con Caramelo Mediano",
                precio: 49.9,
                imagen: "cafe_10",
                categoriaId: 1
              },
              {
                id: 11,
                nombre: "Café Mocha Frio con Chocolate Mediano",
                precio: 49.9,
                imagen: "cafe_11",
                categoriaId: 1
              },
              {
                id: 12,
                nombre: "Café Espresso",
                precio: 29.9,
                imagen: "cafe_12",
                categoriaId: 1
              },
              {
                id: 13,
                nombre: "Café Capuchino Grande con Caramelo",
                precio: 59.9,
                imagen: "cafe_13",
                categoriaId: 1
              },
              {
                id: 14,
                nombre: "Café Caramelo Grande",
                precio: 59.9,
                imagen: "cafe_14",
                categoriaId: 1
              },
              {
                id: 15,
                nombre: "Paquete de 3 donas de Chocolate",
                precio: 39.9,
                imagen: "donas_01",
                categoriaId: 4
              },
              {
                id: 16,
                nombre: "Paquete de 3 donas Glaseadas",
                precio: 39.9,
                imagen: "donas_02",
                categoriaId: 4
              },
              {
                id: 17,
                nombre: "Dona de Fresa ",
                precio: 19.9,
                imagen: "donas_03",
                categoriaId: 4
              },
              {
                id: 18,
                nombre: "Dona con Galleta de Chocolate ",
                precio: 19.9,
                imagen: "donas_04",
                categoriaId: 4
              },
              {
                id: 19,
                nombre: "Dona glass con Chispas Sabor Fresa ",
                precio: 19.9,
                imagen: "donas_05",
                categoriaId: 4
              },
              {
                id: 20,
                nombre: "Dona glass con Chocolate ",
                precio: 19.9,
                imagen: "donas_06",
                categoriaId: 4
              },
              {
                id: 21,
                nombre: "Dona de Chocolate con MÁS Chocolate ",
                precio: 19.9,
                imagen: "donas_07",
                categoriaId: 4
              },
              {
                id: 22,
                nombre: "Paquete de 3 donas de Chocolate ",
                precio: 39.9,
                imagen: "donas_08",
                categoriaId: 4
              },
              {
                id: 23,
                nombre: "Paquete de 3 donas con Vainilla y Chocolate ",
                precio: 39.9,
                imagen: "donas_09",
                categoriaId: 4
              },
              {
                id: 24,
                nombre: "Paquete de 6 Donas",
                precio: 69.9,
                imagen: "donas_10",
                categoriaId: 4
              },
              {
                id: 25,
                nombre: "Paquete de 3 Variadas",
                precio: 39.9,
                imagen: "donas_11",
                categoriaId: 4
              },
              {
                id: 25,
                nombre: "Dona Natural con Chocolate",
                precio: 19.9,
                imagen: "donas_12",
                categoriaId: 4
              },
              {
                id: 26,
                nombre: "Paquete de 3 Donas de Chocolate con Chispas",
                precio: 39.9,
                imagen: "donas_13",
                categoriaId: 4
              },
              {
                id: 27,
                nombre: "Dona Chocolate y Coco",
                precio: 19.9,
                imagen: "donas_14",
                categoriaId: 4
              },
              {
                id: 28,
                nombre: "Paquete Galletas de Chocolate",
                precio: 29.9,
                imagen: "galletas_01",
                categoriaId: 6
              },
              {
                id: 29,
                nombre: "Paquete Galletas de Chocolate y Avena",
                precio: 39.9,
                imagen: "galletas_02",
                categoriaId: 6
              },
              {
                id: 30,
                nombre: "Paquete de Muffins de Vainilla",
                precio: 39.9,
                imagen: "galletas_03",
                categoriaId: 6
              },
              {
                id: 31,
                nombre: "Paquete de 4 Galletas de Avena",
                precio: 24.9,
                imagen: "galletas_04",
                categoriaId: 6
              },
              {
                id: 32,
                nombre: "Galletas de Mantequilla Variadas",
                precio: 39.9,
                imagen: "galletas_05",
                categoriaId: 6
              },
              {
                id: 33,
                nombre: "Galletas de sabores frutales",
                precio: 39.9,
                imagen: "galletas_06",
                categoriaId: 6
              },
              {
                id: 34,
                nombre: "Hamburguesa Sencilla",
                precio: 59.9,
                imagen: "hamburguesas_01",
                categoriaId: 2
              },
              {
                id: 35,
                nombre: "Hamburguesa de Pollo",
                precio: 59.9,
                imagen: "hamburguesas_02",
                categoriaId: 2
              },
              {
                id: 36,
                nombre: "Hamburguesa de Pollo y Chili",
                precio: 59.9,
                imagen: "hamburguesas_03",
                categoriaId: 2
              },
              {
                id: 37,
                nombre: "Hamburguesa Queso y  Pepinos",
                precio: 59.9,
                imagen: "hamburguesas_04",
                categoriaId: 2
              },
              {
                id: 38,
                nombre: "Hamburguesa Cuarto de Libra",
                precio: 59.9,
                imagen: "hamburguesas_05",
                categoriaId: 2
              },
              {
                id: 39,
                nombre: "Hamburguesa Doble Queso",
                precio: 69.9,
                imagen: "hamburguesas_06",
                categoriaId: 2
              },
              {
                id: 40,
                nombre: "Hot Dog Especial",
                precio: 49.9,
                imagen: "hamburguesas_07",
                categoriaId: 2
              },
              {
                id: 41,
                nombre: "Paquete 2 Hot Dogs",
                precio: 69.9,
                imagen: "hamburguesas_08",
                categoriaId: 2
              },
              {
                id: 42,
                nombre: "4 Rebanadas de Pay de Queso",
                precio: 69.9,
                imagen: "pastel_01",
                categoriaId: 5
              },
              {
                id: 43,
                nombre: "Waffle Especial",
                precio: 49.9,
                imagen: "pastel_02",
                categoriaId: 5
              },
              {
                id: 44,
                nombre: "Croissants De la casa",
                precio: 39.9,
                imagen: "pastel_03",
                categoriaId: 5
              },
              {
                id: 45,
                nombre: "Pay de Queso",
                precio: 19.9,
                imagen: "pastel_04",
                categoriaId: 5
              },
              {
                id: 46,
                nombre: "Pastel de Chocolate",
                precio: 29.9,
                imagen: "pastel_05",
                categoriaId: 5
              },
              {
                id: 47,
                nombre: "Rebanada Pastel de Chocolate",
                precio: 29.9,
                imagen: "pastel_06",
                categoriaId: 5
              },
              {
                id: 48,
                nombre: "Pizza Spicy con Doble Queso",
                precio: 69.9,
                imagen: "pizzas_01",
                categoriaId: 3
              },
              {
                id: 49,
                nombre: "Pizza Jamón y Queso",
                precio: 69.9,
                imagen: "pizzas_02",
                categoriaId: 3
              },
              {
                id: 50,
                nombre: "Pizza Doble Queso",
                precio: 69.9,
                imagen: "pizzas_03",
                categoriaId: 3
              },
              {
                id: 51,
                nombre: "Pizza Especial de la Casa",
                precio: 69.9,
                imagen: "pizzas_04",
                categoriaId: 3
              },
              {
                id: 52,
                nombre: "Pizza Chorizo",
                precio: 69.9,
                imagen: "pizzas_05",
                categoriaId: 3
              },
              {
                id: 53,
                nombre: "Pizza Hawaiana",
                precio: 69.9,
                imagen: "pizzas_06",
                categoriaId: 3
              },
              {
                id: 54,
                nombre: "Pizza Tocino",
                precio: 69.9,
                imagen: "pizzas_07",
                categoriaId: 3
              },
              {
                id: 55,
                nombre: "Pizza Vegetales y Queso",
                precio: 69.9,
                imagen: "pizzas_08",
                categoriaId: 3
              },
              {
                id: 56,
                nombre: "Pizza Pepperoni y Queso",
                precio: 69.9,
                imagen: "pizzas_09",
                categoriaId: 3
              },
              {
                id: 57,
                nombre: "Pizza Aceitunas y Queso",
                precio: 69.9,
                imagen: "pizzas_10",
                categoriaId: 3
              },
              {
                id: 58,
                nombre: "Pizza Queso, Jamón y Champiñones",
                precio: 69.9,
                imagen: "pizzas_11",
                categoriaId: 3
              }
          ] */
        
        obtenerProductoAux()
        const categoria = categorias.filter( cat => cat._id === id )
        const productosEnCategoria = productosAux.filter( prod => prod.categoryId === id)
        // console.log("en click: ", productosEnCategoria);
        
        const data = { categoria: categoria[0], productos: productosEnCategoria }
        // setCategoriaActual(categoria[0]) --old version
        setCategoriaActual(data)  
        router.push('/ProductsList') /*  antes al '/' */
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ ...producto }) => {
      console.log(" dentro producto ?:", producto)
        if(pedido.some(productoState => productoState._id === producto._id)) {
           
          // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productoState => productoState._id === producto._id ? producto : productoState)
           // console.log("pedidoActualizado:", pedidoActualizado);
           setPedido(pedidoActualizado)

           toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
        
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto._id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto._id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            
            /* const productosAux = [
                {
                    id: 1,
                    nombre: "Café Caramel con Chocolate",
                    precio: 59.9,
                    imagen: "cafe_01",
                    categoriaId: 1
                  },
                  {
                    id: 2,
                    nombre: "Café Frio con Chocolate Grande",
                    precio: 49.9,
                    imagen: "cafe_02",
                    categoriaId: 1
                  },
                  {
                    id: 3,
                    nombre: "Latte Frio con Chocolate Grande",
                    precio: 54.9,
                    imagen: "cafe_03",
                    categoriaId: 1
                  },
                  {
                    id: 4,
                    nombre: "Latte Frio con Chocolate Grande",
                    precio: 54.9,
                    imagen: "cafe_04",
                    categoriaId: 1
                  },
                  {
                    id: 5,
                    nombre: "Malteada Fria con Chocolate Grande",
                    precio: 54.9,
                    imagen: "cafe_05",
                    categoriaId: 1
                  },
                  {
                    id: 6,
                    nombre: "Café Mocha Caliente Chico",
                    precio: 39.9,
                    imagen: "cafe_06",
                    categoriaId: 1
                  },
                  {
                    id: 7,
                    nombre: "Café Mocha Caliente Grande con Chocolate",
                    precio: 59.9,
                    imagen: "cafe_07",
                    categoriaId: 1
                  },
                  {
                    id: 8,
                    nombre: "Café Caliente Capuchino Grande",
                    precio: 59.9,
                    imagen: "cafe_08",
                    categoriaId: 1
                  },
                  {
                    id: 9,
                    nombre: "Café Mocha Caliente Mediano",
                    precio: 49.9,
                    imagen: "cafe_09",
                    categoriaId: 1
                  },
                  {
                    id: 10,
                    nombre: "Café Mocha Frio con Caramelo Mediano",
                    precio: 49.9,
                    imagen: "cafe_10",
                    categoriaId: 1
                  },
                  {
                    id: 11,
                    nombre: "Café Mocha Frio con Chocolate Mediano",
                    precio: 49.9,
                    imagen: "cafe_11",
                    categoriaId: 1
                  },
                  {
                    id: 12,
                    nombre: "Café Espresso",
                    precio: 29.9,
                    imagen: "cafe_12",
                    categoriaId: 1
                  },
                  {
                    id: 13,
                    nombre: "Café Capuchino Grande con Caramelo",
                    precio: 59.9,
                    imagen: "cafe_13",
                    categoriaId: 1
                  },
                  {
                    id: 14,
                    nombre: "Café Caramelo Grande",
                    precio: 59.9,
                    imagen: "cafe_14",
                    categoriaId: 1
                  },
                  {
                    id: 15,
                    nombre: "Paquete de 3 donas de Chocolate",
                    precio: 39.9,
                    imagen: "donas_01",
                    categoriaId: 4
                  },
                  {
                    id: 16,
                    nombre: "Paquete de 3 donas Glaseadas",
                    precio: 39.9,
                    imagen: "donas_02",
                    categoriaId: 4
                  },
                  {
                    id: 17,
                    nombre: "Dona de Fresa ",
                    precio: 19.9,
                    imagen: "donas_03",
                    categoriaId: 4
                  },
                  {
                    id: 18,
                    nombre: "Dona con Galleta de Chocolate ",
                    precio: 19.9,
                    imagen: "donas_04",
                    categoriaId: 4
                  },
                  {
                    id: 19,
                    nombre: "Dona glass con Chispas Sabor Fresa ",
                    precio: 19.9,
                    imagen: "donas_05",
                    categoriaId: 4
                  },
                  {
                    id: 20,
                    nombre: "Dona glass con Chocolate ",
                    precio: 19.9,
                    imagen: "donas_06",
                    categoriaId: 4
                  },
                  {
                    id: 21,
                    nombre: "Dona de Chocolate con MÁS Chocolate ",
                    precio: 19.9,
                    imagen: "donas_07",
                    categoriaId: 4
                  },
                  {
                    id: 22,
                    nombre: "Paquete de 3 donas de Chocolate ",
                    precio: 39.9,
                    imagen: "donas_08",
                    categoriaId: 4
                  },
                  {
                    id: 23,
                    nombre: "Paquete de 3 donas con Vainilla y Chocolate ",
                    precio: 39.9,
                    imagen: "donas_09",
                    categoriaId: 4
                  },
                  {
                    id: 24,
                    nombre: "Paquete de 6 Donas",
                    precio: 69.9,
                    imagen: "donas_10",
                    categoriaId: 4
                  },
                  {
                    id: 25,
                    nombre: "Paquete de 3 Variadas",
                    precio: 39.9,
                    imagen: "donas_11",
                    categoriaId: 4
                  },
                  {
                    id: 25,
                    nombre: "Dona Natural con Chocolate",
                    precio: 19.9,
                    imagen: "donas_12",
                    categoriaId: 4
                  },
                  {
                    id: 26,
                    nombre: "Paquete de 3 Donas de Chocolate con Chispas",
                    precio: 39.9,
                    imagen: "donas_13",
                    categoriaId: 4
                  },
                  {
                    id: 27,
                    nombre: "Dona Chocolate y Coco",
                    precio: 19.9,
                    imagen: "donas_14",
                    categoriaId: 4
                  },
                  {
                    id: 28,
                    nombre: "Paquete Galletas de Chocolate",
                    precio: 29.9,
                    imagen: "galletas_01",
                    categoriaId: 6
                  },
                  {
                    id: 29,
                    nombre: "Paquete Galletas de Chocolate y Avena",
                    precio: 39.9,
                    imagen: "galletas_02",
                    categoriaId: 6
                  },
                  {
                    id: 30,
                    nombre: "Paquete de Muffins de Vainilla",
                    precio: 39.9,
                    imagen: "galletas_03",
                    categoriaId: 6
                  },
                  {
                    id: 31,
                    nombre: "Paquete de 4 Galletas de Avena",
                    precio: 24.9,
                    imagen: "galletas_04",
                    categoriaId: 6
                  },
                  {
                    id: 32,
                    nombre: "Galletas de Mantequilla Variadas",
                    precio: 39.9,
                    imagen: "galletas_05",
                    categoriaId: 6
                  },
                  {
                    id: 33,
                    nombre: "Galletas de sabores frutales",
                    precio: 39.9,
                    imagen: "galletas_06",
                    categoriaId: 6
                  },
                  {
                    id: 34,
                    nombre: "Hamburguesa Sencilla",
                    precio: 59.9,
                    imagen: "hamburguesas_01",
                    categoriaId: 2
                  },
                  {
                    id: 35,
                    nombre: "Hamburguesa de Pollo",
                    precio: 59.9,
                    imagen: "hamburguesas_02",
                    categoriaId: 2
                  },
                  {
                    id: 36,
                    nombre: "Hamburguesa de Pollo y Chili",
                    precio: 59.9,
                    imagen: "hamburguesas_03",
                    categoriaId: 2
                  },
                  {
                    id: 37,
                    nombre: "Hamburguesa Queso y  Pepinos",
                    precio: 59.9,
                    imagen: "hamburguesas_04",
                    categoriaId: 2
                  },
                  {
                    id: 38,
                    nombre: "Hamburguesa Cuarto de Libra",
                    precio: 59.9,
                    imagen: "hamburguesas_05",
                    categoriaId: 2
                  },
                  {
                    id: 39,
                    nombre: "Hamburguesa Doble Queso",
                    precio: 69.9,
                    imagen: "hamburguesas_06",
                    categoriaId: 2
                  },
                  {
                    id: 40,
                    nombre: "Hot Dog Especial",
                    precio: 49.9,
                    imagen: "hamburguesas_07",
                    categoriaId: 2
                  },
                  {
                    id: 41,
                    nombre: "Paquete 2 Hot Dogs",
                    precio: 69.9,
                    imagen: "hamburguesas_08",
                    categoriaId: 2
                  },
                  {
                    id: 42,
                    nombre: "4 Rebanadas de Pay de Queso",
                    precio: 69.9,
                    imagen: "pastel_01",
                    categoriaId: 5
                  },
                  {
                    id: 43,
                    nombre: "Waffle Especial",
                    precio: 49.9,
                    imagen: "pastel_02",
                    categoriaId: 5
                  },
                  {
                    id: 44,
                    nombre: "Croissants De la casa",
                    precio: 39.9,
                    imagen: "pastel_03",
                    categoriaId: 5
                  },
                  {
                    id: 45,
                    nombre: "Pay de Queso",
                    precio: 19.9,
                    imagen: "pastel_04",
                    categoriaId: 5
                  },
                  {
                    id: 46,
                    nombre: "Pastel de Chocolate",
                    precio: 29.9,
                    imagen: "pastel_05",
                    categoriaId: 5
                  },
                  {
                    id: 47,
                    nombre: "Rebanada Pastel de Chocolate",
                    precio: 29.9,
                    imagen: "pastel_06",
                    categoriaId: 5
                  },
                  {
                    id: 48,
                    nombre: "Pizza Spicy con Doble Queso",
                    precio: 69.9,
                    imagen: "pizzas_01",
                    categoriaId: 3
                  },
                  {
                    id: 49,
                    nombre: "Pizza Jamón y Queso",
                    precio: 69.9,
                    imagen: "pizzas_02",
                    categoriaId: 3
                  },
                  {
                    id: 50,
                    nombre: "Pizza Doble Queso",
                    precio: 69.9,
                    imagen: "pizzas_03",
                    categoriaId: 3
                  },
                  {
                    id: 51,
                    nombre: "Pizza Especial de la Casa",
                    precio: 69.9,
                    imagen: "pizzas_04",
                    categoriaId: 3
                  },
                  {
                    id: 52,
                    nombre: "Pizza Chorizo",
                    precio: 69.9,
                    imagen: "pizzas_05",
                    categoriaId: 3
                  },
                  {
                    id: 53,
                    nombre: "Pizza Hawaiana",
                    precio: 69.9,
                    imagen: "pizzas_06",
                    categoriaId: 3
                  },
                  {
                    id: 54,
                    nombre: "Pizza Tocino",
                    precio: 69.9,
                    imagen: "pizzas_07",
                    categoriaId: 3
                  },
                  {
                    id: 55,
                    nombre: "Pizza Vegetales y Queso",
                    precio: 69.9,
                    imagen: "pizzas_08",
                    categoriaId: 3
                  },
                  {
                    id: 56,
                    nombre: "Pizza Pepperoni y Queso",
                    precio: 69.9,
                    imagen: "pizzas_09",
                    categoriaId: 3
                  },
                  {
                    id: 57,
                    nombre: "Pizza Aceitunas y Queso",
                    precio: 69.9,
                    imagen: "pizzas_10",
                    categoriaId: 3
                  },
                  {
                    id: 58,
                    nombre: "Pizza Queso, Jamón y Champiñones",
                    precio: 69.9,
                    imagen: "pizzas_11",
                    categoriaId: 3
                  }
              ] */
            
            obtenerProductoAux()
            const productosEnCategoria = productosAux.filter( prod => prod.categoryId === categorias[0]._id)
            
            const data = { categoria: categorias[0], productos: productosEnCategoria }
        
            setCategoriaActual(data)  
            setPedido([])
            setNombre('')
            setTotal(0)
            nombre = 'XXXXXX'


            toast.success('Pedido Realizado Correctamente')
            let url = 'https://api.whatsapp.com/send?phone=541136936750&text=Hola!%20Mi%20nombre%20es:%20' // 68640728
            let infoPedido = '';
              
            if (pedido.length >= 2){
                
                pedido.forEach( e => {
                    //console.log("data:", e.nombre );
                    infoPedido += '%20[%20*%20' + e.cantidad + '%20' + e.name + '%20]%20%20---'
                })
                
                // console.log("resultado", infoPedido);
                setTimeout(() => {
                    router.push(url + '%20'+ nombre + '%20y%20mi%20pedido%20es:%20' +  infoPedido + '%20Total:%20$' + total.toFixed(2) );
                }, 1000)
                
            }else {
                setTimeout(() => {
                    router.push( url + '%20'+ nombre + '%20y%20mi%20pedido%20es:%20'+ '%20[%20*%20' + pedido[0].cantidad + '%20' + pedido[0].name + '%20]%20%20---%20Total:%20$' + total.toFixed(2) );
                }, 1000)
            }
            

        } catch (error) {
            console.log(error)
        }

    };

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal, 
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre, 
                setNombre,
                colocarOrden,
                total,
                obtenerProdPoCatActual,
                orderByCategory,
                obtieneUltProd,
                ultProd,
                obtienUltCat,
                auxCat

            }}
        >
            {children}
            
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext