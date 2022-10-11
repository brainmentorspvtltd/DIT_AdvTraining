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