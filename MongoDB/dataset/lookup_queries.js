db.customers.aggregate([
    {
        $lookup : {
            from : "cart",
            localField : "c_id",
            foreignField : "c_id",
            as : "output"
        }
    }
])

// Show customer_id, name and cart details
db.customers.aggregate([
    {
        $lookup : {
            from : "cart",
            localField : "c_id",
            foreignField : "c_id",
            as : "output"
        }
    },
    {
        $project : {
            c_id : 1,
            name : 1,
            output : {
                $slice : ["$output.products",1]
            }
        }
    }
])

// Show customer_id, name, product_name added in cart
db.customers.aggregate([
    {
        $lookup : {
            from : "cart",
            localField : "c_id",
            foreignField : "c_id",
            as : "output"
        }
    },
    {
        $lookup : {
            from : "products",
            localField : "output.products.p_id",
            foreignField : "p_id",
            as : "product_output"
        }
    },
    {
        $project : {
            c_id : 1,
            name : 1,
            product_name : "$product_output.p_name"
        }
    }
])