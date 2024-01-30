import axios from 'axios'

class ProductService {
    constructor()
    {
        this.productInstance = axios.create({
            timeout: 8000,
            baseURL: process.env.REACT_APP_SERVER_URL + '/api/products/'
        })
        
        this.categoryInstance = axios.create({
            timeout: 8000,
            baseURL: process.env.REACT_APP_SERVER_URL + '/api/categories/'
        })
    }

    getProducts() {
        return this.productInstance.get('');
    }
    
    getProduct(productId) {
        return this.productInstance.get('' + productId);
    }
    
    getCategoryProducts(productCategoryId) {
        return this.categoryInstance.get(`${productCategoryId}/products`);
    }
    
    addProduct(createRequest) {
        return this.productInstance.post({ createRequest });
    }
    
    updateProduct(productId, updateRequest) {
        return this.productInstance.put('' + productId, { updateRequest });
    }
    
    deleteProduct(productId) {
        return this.productInstance.delete('' + productId);
    }
}

const productService = new ProductService()

export default productService;