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

function cart(req, res) {
    res.send(product)
}

module.exports ={cart}