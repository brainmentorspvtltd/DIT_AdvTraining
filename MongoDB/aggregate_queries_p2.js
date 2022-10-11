db.students.aggregate([
    {
        $group : {
            _id : {
                class : "$class"
            },
            allSubjects : {
                $push : "$marks.theory"
            }
        }
    }
])


db.students.aggregate([
    {
        $group : {
            _id : {
                class : "$class"
            },
            allSubjects : {
                $push : "$subjects"
            }
        }
    }
])


db.students.aggregate([
    {$unwind : "$subjects"},
    {
        $group : {
            _id : {
                class : "$class"
            },
            allSubjects : {
                $addToSet : "$subjects"
            }
        }
    }
])

// will show marks of 2 subjects
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects",2]
            },
            marks : {
                $slice : ["$marks",2]
            }
        }
    }
])


// will show marks of 2nd subject only
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects",1,1]
            },
            marks : {
                $slice : ["$marks",1,1]
            }
        }
    }
])


// will show marks of last 2 subjects
db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            subject : {
                $slice : ["$subjects",-2]
            },
            marks : {
                $slice : ["$marks",-2]
            }
        }
    }
])


db.students.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            examScore : {
                $filter : {
                    input : "$marks",
                    as : "x",
                    cond : {
                        $gt : ["$$x.theory", 85]
                    }
                    
                }
            }
        }
    }
])


// Multiple Array Operations
db.students.aggregate([
    {$unwind : "$marks"},
    {$project : {_id : 1, name : 1, rollno : 1, score : "$marks.theory"}},
    {$sort : {score : -1}},
    {$group : {_id : "$_id", name : {$first : "$name"}, maxScore : {$max : "$score"}}},
    {$sort : {maxScore : -1}}
])


db.summary.aggregate([
    {
        $bucket : {
            groupBy : "$dob.age",
            boundaries : [10,20,30,40,50,60,70,80],
            output : {
                numPersons : {
                    $sum : 1
                },
                avgAge : {
                    $avg : "$dob.age"
                },
            }
        }
    }
])


db.summary.aggregate([
    {
        $bucketAuto : {
            groupBy : "$dob.age",
            buckets : 5,
            output : {
                numPersons : {
                    $sum : 1
                },
                avgAge : {
                    $avg : "$dob.age"
                },
            }
        }
    }
])
