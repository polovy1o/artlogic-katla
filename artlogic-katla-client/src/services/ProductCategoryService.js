import axios from "axios";

class ProductCategoryService {
    constructor() {
        this.instance = axios.create({
            timeout: 8000,
            baseURL: process.env.REACT_APP_SERVER_URL + '/api/categories/'
        })
    }

    getProductCategories() {
        return this.instance.get('');
    }

    getProductCategory(productCategoryId) {
        return this.instance.get('' + productCategoryId)
    }

    addProductCategory(createRequest) {
        return this.instance.post('', createRequest)
    }

    updateProductCategory(productCategoryId, updateRequest) {
        return this.instance.put('' + productCategoryId, updateRequest)
    }

    deleteProductCategory(productCategoryId) {
        return this.instance.delete('' + productCategoryId)
    }

    setProductCategoryStatus(productCategoryId, status) {
        return this.instance.put(productCategoryId + '/status/' + status)
    }
}

const productCategoryService = new ProductCategoryService()

export default productCategoryService;