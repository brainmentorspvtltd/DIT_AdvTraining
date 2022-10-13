db.createCollection("movies", {
    validator : {
        $jsonSchema : {
            bsonType : "object",
            required : ["title", "desc", "genre", "rating"],
            properties : {
                title : {
                    bsonType : "string",
                    description : "must be a string and it is required"
                },
                desc : {
                    bsonType : "string",
                    description : "must be a string and it is required"
                },
                genre : {
                    bsonType : "array",
                    description : "must be an array and it is required",
                    items : {
                        bsonType : "string",
                        description : "must be string"
                    }
                },
                rating : {
                    bsonType : "int",
                    minimum : 1,
                    maximum : 10,
                    description : "must be a number b/w 1 to 10 and it is required"
                },
                reviews : {
                    bsonType : "array",
                    description : "must be an array",
                    items : {
                        bsonType : "object",
                        properties : {
                            user : {
                                bsonType : "objectId",
                                description : "Must be an object refers to user"
                            },
                            text : {
                                bsonType : "string",
                                description : "moview review must be text"
                            }
                        }
                    }
                }
            }
        }
    }
})


// Valid document
db.movies.insertOne({
    title : "Hulk",
    desc : "Sci-fiction movie where a person transform himself to hulk",
    genre : ["action", "sci-fi"],
    rating : 7
})

// Invalid document
db.movies.insertOne({
    title : "Ironman",
    desc : "Sci-fiction movie where a person builds an iron suit for himself",
    genre : "sci-fi",
    rating : Double(4.5)
})