db.students.updateOne(
    {_id : 2},
    {
        $push : {
            practical : {
                $each : [
                    {id : 101, marks : 24},
                    {id : 102, marks : 28},
                    {id : 103, marks : 19}
                ],
                $sort : {
                    marks : 1
                }
            }
        }
    }
)