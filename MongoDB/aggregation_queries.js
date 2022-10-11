db.summary.aggregate([
    {
        $match : {
            gender : "male"
        }
    }
])


db.summary.aggregate([
    {$match : {gender : "male"}},
    {$group : {_id : {"gender" : "male"}, total : {$sum : 1}}}
])

db.summary.aggregate([
    {$group : {_id : {gender : "$gender"}, total : {$sum : 1}}}
])

db.summary.aggregate([
    {$match : {gender : "male"}},
    {$group : {_id : {state : "$location.state"}, total : {$sum : 1}}}
])

db.summary.aggregate([
    {$match : {gender : "male"}},
    {$group : {_id : {state : "$location.state"}, total : {$sum : 1}}},
    {$sort : {total : -1}}
])

db.summary.aggregate([
    {$match : {gender : "male"}},
    {
        $project : {
            _id : 0,
            name : 1,
            gender : 1
        }
    }
])

db.summary.aggregate([
    {$match : {gender : "male"}},
    {
        $project : {
            _id : 0,
            gender : 1,
            fullName : {
                $concat : ["$name.title",". ", "$name.first", " ", "$name.last"]
            }
        }
    }
])


db.summary.aggregate([
    {$match : {gender : "male"}},
    {
        $project : {
            _id : 0,
            gender : 1,
            fullName : {
                $concat : [
                    {$toUpper : "$name.title"}, ". ",
                    {$toUpper : "$name.first"}, " ",
                    {$toUpper : "$name.last"}
                ]
            }
        }
    }
])


db.summary.aggregate([
    {$match : {gender : "male"}},
    {
        $project : {
            _id : 0,
            gender : 1,
            fullName : {
                $concat : [
                    {
                        $toUpper : {$substrCP : ["$name.title", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.title", 1,
                            {
                                $subtract : [{$strLenCP : "$name.title"}, 1]
                            }
                        ]
                    },
                    ". ",
                    {
                        $toUpper : {$substrCP : ["$name.first", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.first", 1,
                            {
                                $subtract : [{$strLenCP : "$name.first"}, 1]
                            }
                        ]
                    },
                    " ",
                    {
                        $toUpper : {$substrCP : ["$name.last", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.last", 1,
                            {
                                $subtract : [{$strLenCP : "$name.last"}, 1]
                            }
                        ]
                    }
                ]
            }
        }
    }
])



db.summary.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            location : {
                coordinates : [
                    "$location.coordinates.latitude",
                    "$location.coordinates.longitude"
                ]
            }
        }
    },
    {
        $project : {
            _id : 0,
            gender : 1,
            location : 1,
            email : 1,
            fullName : {
                $concat : [
                    {
                        $toUpper : {$substrCP : ["$name.title", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.title", 1,
                            {
                                $subtract : [{$strLenCP : "$name.title"}, 1]
                            }
                        ]
                    },
                    ". ",
                    {
                        $toUpper : {$substrCP : ["$name.first", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.first", 1,
                            {
                                $subtract : [{$strLenCP : "$name.first"}, 1]
                            }
                        ]
                    },
                    " ",
                    {
                        $toUpper : {$substrCP : ["$name.last", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.last", 1,
                            {
                                $subtract : [{$strLenCP : "$name.last"}, 1]
                            }
                        ]
                    }
                ]
            }
        }
    }
])


db.summary.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            location : {
                coordinates : [
                    {
                        $convert : {
                            input : "$location.coordinates.latitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    },
                    {
                        $convert : {
                            input : "$location.coordinates.longitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    }
                ]
            }
        }
    },
    {
        $project : {
            _id : 0,
            gender : 1,
            location : 1,
            email : 1,
            fullName : {
                $concat : [
                    {
                        $toUpper : {$substrCP : ["$name.title", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.title", 1,
                            {
                                $subtract : [{$strLenCP : "$name.title"}, 1]
                            }
                        ]
                    },
                    ". ",
                    {
                        $toUpper : {$substrCP : ["$name.first", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.first", 1,
                            {
                                $subtract : [{$strLenCP : "$name.first"}, 1]
                            }
                        ]
                    },
                    " ",
                    {
                        $toUpper : {$substrCP : ["$name.last", 0, 1]}
                    },
                    {
                        $substrCP : [
                            "$name.last", 1,
                            {
                                $subtract : [{$strLenCP : "$name.last"}, 1]
                            }
                        ]
                    }
                ]
            }
        }
    }
])