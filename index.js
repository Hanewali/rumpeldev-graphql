const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { Schema } = mongoose

const typeDefs = gql`
    type Post {
    	_id: String!
        title: String!
        contentSummary: String!
        imageUrl: String!
        content: String!
        authorName: String!
    }

    type PortfolioApplication {
        _id: String!
        name: String!
        image: String!
        description: String
    }
    
    type Query {
        posts(first: Int, limit: Int!): [Post]
        portfolioApplications(first: Int, limit: Int!): [PortfolioApplication]
        post(id: ID!): Post
    }
`;

const PostSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        content: String,
        imageUrl: String,
        contentSummary: String,
        authorName: String
    }
)

const PortfolioApplicationSchema = new Schema(
    {
        _id: String,
        name: String,
        image: String,
        description: String
    }
)

const Post = mongoose.model('Post', PostSchema, 'posts')
const PortfolioApplication = mongoose.model('PortfolioApplication', PortfolioApplicationSchema, 'portfolioApplications')

const resolvers = {
    Query: {
        posts: (parent, args, context, info) =>
            new Promise((resolve, reject) =>
                Post.find()
                    .skip(args.first ?? 0)
                    .limit(args.limit)
                    .lean()
                    .exec((error, doc) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(doc)
                    })),
        portfolioApplications: (parent, args, context, info) =>
            new Promise((resolve, reject) =>
                PortfolioApplication.find({})
                    .skip(args.skip ?? 0)
                    .limit(args.limit)
                    .lean()
                    .exec((error, doc) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(doc)
                    })),
        post: (parent, args, context, info) =>
            new Promise((resolve, reject) =>
                Post.findById(args.id)
                    .lean()
                    .exec((error, doc) => {
                        console.log(doc)
                        if (error) {
                            reject(error)
                        }
                        resolve(doc)
                    })),
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const connectionString =`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBURL}:${process.env.DBPORT}/${process.env.DBNAME}`

console.log(connectionString)

mongoose
    .connect(connectionString)
    .then(() => {
        console.log('MongoDB connected succesfully')

        server.listen(process.env.PORT).then(({ url }) => {
            console.log(`Server read at ${url}`);
        })
            .catch(() => {
                console.error('Error while starting Apollo Server')
            });
    })
    .catch((err) => {
        console.error('Error while connecting to MongoDB: ' + err)
    })

console.log("Server closed!")
console.log(" ")

