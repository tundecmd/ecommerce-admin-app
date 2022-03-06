import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button,  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory,
         addCategory, 
         updateCategories,
         deleteCategories as deleteCategoriesAction
    } from '../../actions/category.action'
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input'
import Modal from '../../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowForward, IoIosArrowDown  } from "react-icons/io";


/**
* @author
* @function Category
**/

const Category = (props) => {

    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const handleClose = () => {

        const form = new FormData();
        form.append(`name`, categoryName)
        form.append(`parentId`, parentCategoryId)
        form.append(`categoryImage`, categoryImage)
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const category = useSelector(state => state.category);
    const dispatch = useDispatch()

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options=[]) => {
        for (const category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = e => {
        setCategoryImage(e.target.files[0])
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories()
        setUpdateCategoryModal(true);
        // console.log({checked, expanded, categories, checkedArray, expandedArray})
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    };

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory())
                }
            })
        setUpdateCategoryModal(false);
    }

    const renderUpdateCategoriesModal = () => {
        return (
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={`Update Category`}
                size={`lg`}
            >
            <Row>
                <Col>
                    <h6>Expanded Categories</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 && 
                expandedArray.map((item, index) => 
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={e => handleCategoryInput(`name`, e.target.value, index, `expanded`)}
                            />
                        </Col>
                        <Col>
                            <select 
                                className="form-control" 
                                value={item.parentId} 
                                onChange={e => handleCategoryInput(`parentId`, e.target.value, index, `expanded`)}
                            >
                                <option>select category</option>
                                {
                                    createCategoryList(category.categories).map(option => 
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option>Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }

            <Row>
                <Col>
                    <h6>Checked Categories</h6>
                </Col>
            </Row>
            {
                checkedArray.length > 0 && 
                checkedArray.map((item, index) => 
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={e => handleCategoryInput(`name`, e.target.value, index, `checked`)}
                            />
                        </Col>
                        <Col>
                            <select 
                                className="form-control" 
                                value={item.parentId} 
                                onChange={e => handleCategoryInput(`parentId`, e.target.value, index, `checked`)}
                            >
                                <option>select category</option>
                                {
                                    createCategoryList(category.categories).map(option => 
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                            >
                                <option>Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        );
    }

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={`Add New Category`}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                    <select className="form-control" value={parentCategoryId} onChange={e => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(option => 
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        );  
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    };

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map(item => ({_id: item.value}));
        const expandedIdsArray = expandedArray.map(item => ({_id: item.value}));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        dispatch(deleteCategoriesAction(idsArray))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory())
                    setDeleteCategoryModal(false)
                }
            })
    };

    const renderDeleteCategoryModal = () => {
        console.log('delete', checkedArray);

        return (
            <Modal
                modalTitle='Confirm'
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no')
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
            </Modal>
        );
    };

  return(
    <Layout sidebar>
        <Container>
            <Row>
                <Col md={12} className="d-flex justify-content-between">
                    <h3>Category</h3>
                    <button onClick={handleShow}>Add</button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {/* <ul>
                        { renderCategories(category.categories) } 
                    </ul> */}
                    <CheckboxTree
                        nodes={renderCategories(category.categories)}
                        checked={checked}
                        expanded={expanded}
                        onCheck={checked => setChecked(checked)}
                        onExpand={expanded => setExpanded(expanded)}
                        icons={{
                            check: <IoIosCheckbox />,
                            uncheck: <IoIosCheckboxOutline />,
                            halfCheck: <IoIosCheckboxOutline />,
                            expandClose: <IoIosArrowForward />,
                            expandOpen: <IoIosArrowDown />
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={deleteCategory}>Delete</button>
                    <button onClick={updateCategory}>Edit</button>
                </Col>
            </Row>
        </Container>
        { renderAddCategoryModal() }
        { renderUpdateCategoriesModal() }
        { renderDeleteCategoryModal() }
    </Layout>
   )
}

export default Category