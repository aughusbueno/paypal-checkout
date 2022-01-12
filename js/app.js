class CheckOut {
    constructor(){
        this.URLs = "http://localhost:3001"
        this.endpoints = {
            order : this.URLs+"/order",
            cart : this.URLs+"/cart"
        }
        this.summary_container = document.querySelector('.summary-result')
        this.orders_container = document.querySelector('.order-result')
    }

    SimpleFormValidation() {
        const fn = document.querySelector('#fname')
        const ln = document.querySelector('#lname')
        const address = document.querySelector('#address')
        const country = document.querySelector('#country')
        const city = document.querySelector('#city')
        const state = document.querySelector('#state')
        const zip = document.querySelector('#zip')
        const phone = document.querySelector('#phone_num')

        const btn = document.querySelector('.continue_btn')
        const el = [fn,ln,address,country,city,state,zip,phone]

        el.map(e => {
            e.addEventListener('input', evt => {
                if(e.value.trim() !== "") return e.classList.remove('is-invalid')
                e.classList.add('is-invalid')
            })
        })
        
        btn.addEventListener('click', evt => {
            el.map(e => {
                if(e.value.trim() !== "") return e.classList.remove('is-invalid')
                e.classList.add('is-invalid')
            })
        })
    }

    OrderSummary(){
        const data = async () => {
            const url = await fetch(this.endpoints.cart)

            return url.json()
        }

        data().then(result => {
            
            let total_amount = 0
            let total_order = 0
            this.orders_container.innerHTML = ''

            result.map(res => {

                total_amount = total_amount + (res.price * res.quantity)
                total_order++

                this.orders_container.innerHTML += `<div class="rounded p-2 border d-flex" ><span><img src="${res.img}" alt="" style="width:130px" class="block"></span><div class="ps-2"><p class="m-0 fw-bold">${res.productName}</p><p class="m-0"></p><small class="text-secondary">$ ${res.price.toFixed(2)} - ${res.quantity} pcs</small><input type="hidden" class="product_id" value="${res.id}"></div></div>`
                
            })
            
            this.summary_container.innerHTML = `<p class="d-flex justify-content-between"><span>SUBTOTAL :</span><span>$ ${total_amount.toFixed(2)}</span></p><p class="d-flex justify-content-between"><span>SHIPPING :</span><span>FREE</span></p><hr><p class="fw-bold d-flex justify-content-between m-0 fs-5"><span>TOTAL :</span><span class="text-danger">$ ${total_amount.toFixed(2)}</span></p>`
        })
    }

    PayPal() {
        paypal.Buttons({
            createOrder: async (data, actions) => {
                let items = []

                document.querySelectorAll('.product_id').forEach(each => {
                    items.push({id:each.value})
                })

                const orders = async () => {
                    const url = await fetch(this.endpoints.order,{
                        method : "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body : JSON.stringify({
                            items : items
                        })
                    })
        
                    return url.json()
                }
        
                const result = await orders()
        
                return actions.order.create(result)
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(function(details) {
                    const toastLive = document.getElementById('liveToast')
                    const toast = new bootstrap.Toast(toastLive)

                    toast.show()
                });
            }
        }).render('#paypal');
    }

    init(){
        this.PayPal()
        this.SimpleFormValidation()
        this.OrderSummary()
    }
}

new CheckOut().init()