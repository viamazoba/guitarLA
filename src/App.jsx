import { useState } from 'react'
import './App.css'
import { Guitar } from './components/Guitar'
import { db } from './data/db'

function App() {
  const [ data, setData ] = useState(db);
  const [ cart, setCart ] = useState([]);

  const handleAddToCart = (item) =>{

    const indexItemExist = cart.findIndex(element =>{
      return item.id === element.id
    })

    if(indexItemExist === -1) {
      setCart(prevCart => [...prevCart, item])
    }
  }

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo"/>
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito"/>

                <div id="carrito" className="bg-white p-3">
                  <p className="text-center">El carrito esta vacio</p>
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img className="img-fluid" src="./public/img/guitarra_02.jpg" alt="imagen guitarra"/>
                        </td>
                        <td>SRV</td>
                        <td className="fw-bold">
                          $299
                        </td>
                        <td className="flex align-items-start gap-4">
                          <button type="button" className="btn btn-dark">
                            -
                          </button>
                          1
                          <button type="button" className="btn btn-dark">
                            +
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger" type="button">
                            X
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="text-end">Total pagar:
                    <span className="fw-bold">$899</span>
                  </p>
                  <button className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar)=>(
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart = { handleAddToCart }
              />
            ))
          }
         
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
