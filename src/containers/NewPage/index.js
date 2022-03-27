import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layouts/index';
import Input from '../../components/UI/input';
import Modal from '../../components/UI/Modal';
import linearCategories from '../../helpers/linearCategories';
import { createPage } from "../../actions";

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const category = useSelector(state => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setdescription] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const onCategoryChange = e => {
    // console.log('categories', categories);
    const category = categories.find(category => category._id == e.target.value);
    setCategoryId(e.target.value); 
    setType(category.type);
  };

  const handleBannerImages = e => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = e => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };  

  const submitPageForm = e => {
    // e.target.preventDefault();
    
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });

    dispatch(createPage(form));

    console.log({title, categories, categoryId, products, banners, type, description});
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <select
                className='form-control form-control-sm'
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">select category</option>
                {
                  categories.map(cat => 
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  )
                }
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page Title'}
                className="form-control form-control-sm"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder={'Page description'}
                className="form-control-sm"
              />
            </Col>
          </Row>
          <Row>
            {
              banners.length > 0 ?
              banners.map((banner, index) => 
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ) : null
            }
            <Col>
              <Input
                className="form-control form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>
          <Row>
            {
              products.length > 0 ?
              products.map((product, index) => 
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ) : null
            }
            <Col>
              <Input
                className="form-control form-control-sm"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>

      </Modal>
    );
  };
  return (
    <Layout sidebar>
      { renderCreatePageModal() }
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  )
}

export default NewPage;