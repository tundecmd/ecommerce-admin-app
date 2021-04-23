import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Modal, Button,  } from 'react-bootstrap'
import { addCategory, getAllCategory } from '../../actions/category.action'
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action'

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
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

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
  return(
    <Layout sidebar>
        <Container>
          <Row>
            <Col md={12} className="d-flex justify-content-between">
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Input
                label={`Product Name`}
                value={name}
                //placeholder={`Product Name`}
                onChange={(e) => setname(e.target.value)}
              />
              <Input
                label={`Quantity`}
                value={quantity}
                //placeholder={`Product Name`}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Input
                label={`Price`}
                value={price}
                //placeholder={`Product Name`}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                label={`Description`}
                value={description}
                //placeholder={`Product Name`}
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
              
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </Layout>
  )

 }

export default Products