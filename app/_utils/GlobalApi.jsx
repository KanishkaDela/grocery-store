const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');

const getSliders=()=>axiosClient.get('/sliders?populate=*').then(resp=>{
    return resp.data.data
})

const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data
})

const getAllProducts=()=>axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data
})

const getProductsByCategory=(category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+"&populate=*").then(resp=>{
    return resp.data.data
})

const registerUSer=(username,email,password)=>axiosClient.post('/auth/local/register',{
    username:username,
    email:email,
    password:password
});

const SignIn=(email,password)=>axiosClient.post('/auth/local',{
    identifier:email,
    password:password
})

const addToCart=(data,jwt)=>axiosClient.post('/user-carts',data,{
    headers:{
        Authorization:'Bearer '+jwt
    }
});

const getCartItems=(userId,jwt)=>axiosClient.get('/user-carts?filters[userId][$eq]='+userId+'&populate[products][populate]=images',
    {
        headers:{
            Authorization:'Bearer '+jwt
        }
    }).then(resp=>{
        const data=resp.data.data;
        const cartItemsList=data.map((item,index)=>({
            name:item.products?.[0]?.name,
            quantity:item.quantity,
            amount:item.amount,
            image:item.products?.[0]?.images?.[0]?.url,
            actualPrice:item.products?.[0]?.mrp,
            id:item.documentId,
            product:item.products?.[0]?.id
        }))

        return cartItemsList

    });

    const deleteCartItem=(id,jwt)=>axiosClient.delete('/user-carts/'+id,
    {
        headers:{
            Authorization:'Bearer '+jwt
        }

    })

    const createOrder=(data,jwt)=>axiosClient.post('/orders',data,{
        headers:{
            Authorization:'Bearer '+jwt
        }
    })

export default{
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    registerUSer,
    SignIn,
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrder
}