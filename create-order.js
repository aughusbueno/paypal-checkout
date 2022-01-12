// # FAKE DATA
const product = [
    {
        id : 1,
        productName : "Off-White X Air Jordan 1 'UNC'",
        img : "https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/unc-1_xfemqz.jpg",
        price : 190,
        currency : "USD",
        quantity : 3
    }
]
// #

async function PaypalOrder (req, res) {
    try{
        const productList = product

        const total = req.body.items.reduce((sum, product) => {
            return sum + productList.filter(e => e.id == product.id).reduce((s, p) => (s + p.quantity * p.price),0)
        },0)
        
        res.json({
            purchase_units : [
                {
                    amount : {
                        value : total,
                    }
                }
            ]
        })
    }
    catch(err){
        res.json({status:false,message:"Error Occured",error:err})
    }
}

module.exports ={PaypalOrder}