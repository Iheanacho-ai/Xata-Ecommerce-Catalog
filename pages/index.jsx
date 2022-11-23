import { useState } from 'react';
import { getXataClient } from '../src/xata';
import Head from "next/head"


const Home = ({products}) => {
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productURL, setProductURL] = useState()

  const openupWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'amarachi-2812',
        upload_preset: 'xoskczw2'
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setProductURL(result.info.url)       
        }else{
          console.log(error)
        }
      }
    ).open();
  } 
  
  const submitProduct = () => {
    fetch('/api/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName,
        productPrice,
        productURL
      })
    }).then(() => {
      window.location.reload()
    }).catch((error)=> {
      console.log(error)
    });
  }

  const deleteProduct = (id) => {
    fetch("/api/delete-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      window.location.reload();
    }).catch((error)=> {
      console.log(error)
    });
  }
  return (
    <div className= 'product-catalog'> 
      <Head>
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"/>
      </Head>
      <div className="product-container mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <textarea
                    id="productName"
                    name="productName"
                    rows={1}
                    value= {productName}
                    onChange = {(e)=> setProductName(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  {/* productPrice variable goes here */}
                  <input
                    type="text"
                    name="productPrice"
                    id="productPrice"
                    value= {productPrice}
                    onChange = {(e)=> setProductPrice(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />

                </div>
              </div>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick= {openupWidget}>
                Upload files
              </button>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  onClick={submitProduct}
                  className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {
                products.map(({productName, productURL, productPrice, id}) => (
                  <a href="#" className="group" id= {id}>
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <img src={productURL} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{productName}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${productPrice}</p>
                    <button
                      type="button"
                      className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={()=> deleteProduct(id)}
                    >
                    Delete
                  </button>
                  </a>
                ))
              }
            </div>   

        </div>
      </div>

    </div>
  )
}


export const getServerSideProps = async () => {
  const xata = getXataClient();
  const products = await xata.db.product.getAll()
  return { props: { products } }
}


export default Home;