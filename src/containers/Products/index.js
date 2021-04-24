import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Table,  } from 'react-bootstrap'
import { addCategory, getAllCategory } from '../../actions/category.action'
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input'
import Modal from '../../components/UI/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import "./styles.css"
import { generatePublicUrl } from '../../urlConfig'

/**
* @author
* @function Products
**/

const Products = (props) => {
  const [name, setname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);

  const [show, setShow] = useState(false);
  const handleClose = () => {
      const form = new FormData();
      form.append('name', name);
      form.append('quantity', quantity);
      form.append('price', price);
      form.append('description', description);
      form.append('category', categoryId);

      for (let pic of productPictures) {
        form.append('productPicture', pic)
      }

      dispatch(addProduct(form));

      setShow(false)
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options=[]) => {
    for (const category of categories) {
        options.push({
            value: category._id,
            name: category.name
        })
        if (category.children.length > 0) {
            createCategoryList(category.children, options)
        }
    }
    return options;
  }

  const handleProductPictures = e => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ])
  }
  console.log(`productPictures`, productPictures)
  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {console.log(`product`, product.products.category && product.products.category.name)}
          {
            product.products.length > 0 ? 
            product.products.map(product => 
              <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                <td>1</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category ? product.category.name : `${product.name}`}</td>
              </tr>
            ) : null
          }
        </tbody>
      </Table>
    )
  }
  const renderAddProductModal = () => {
    return (
      <Modal 
          show={show} 
          handleClose={handleClose}
          modalTitle={`Add New Product`}
        >  
            <Input
              label={`Product Name`}
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <Input
              label={`Quantity`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              label={`Price`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              label={`Description`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <select className="form-control" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              <option>Select Category</option>
              {           
                createCategoryList(category.categories).map(option => 
                  <option key={option.value} value={option.value}>{option.name}</option>
                )
              }
            </select>

            {
              productPictures.length > 0 ?
              productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
            }

            <input type="file" name="productPictures" onChange={handleProductPictures} />
      </Modal>
    )
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false)
  }
  const showProductDetailsModal = product => {
    setProductDetails(product)
    setProductDetailModal(true)
    console.log(`product`, product)
  }

  const renderProductDetailsModal = () => {

    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={`Product Details`}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category ? productDetails.category.name : '--'}</p>
          </Col>
        </Row>    
        <Row>
        <Col md="12">
          <label className="key">Category</label>
          <p className="value">{productDetails.description ? productDetails.description : '--'}</p>
          </Col>
        </Row>    
        <Row>
          <Col >
            <label className="key">Product Pictures</label>
            <div className="d-flex">
              {
                productDetails.productPictures.map(picture => 
                  <div className="productImgContainer">
                    <img src={generatePublicUrl(picture.img)} />
                  </div>)
              }
            </div>
            
          </Col>
        </Row>
      </Modal>
    )
  }
  return(
    <Layout sidebar>
        <Container>"
          <Row>
            <Col md={12} className="d-flex justify-content-between">
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </Col>
          </Row>
          <Row>
            <Col>
            { renderProducts() }
            </Col>
          </Row>
        </Container>
        { renderAddProductModal() }
        { renderProductDetailsModal() }
    </Layout>
  )
}

export default Products