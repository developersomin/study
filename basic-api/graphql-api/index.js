import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

const typeDefs= `#graphql 

    type MyResult{
        number: Int
        writer: String
        title: String
        contents: String
    }
    
    input CreateBoardInput {
        writer: String
        title: String
        contents: String
    }

    type Query {
        fetchBoards: [MyResult]
    }

    type Mutation {
        createBoard(createBoardInput: CreateBoardInput): String
    }
    
    
`
const resolvers = {
    Query: {
        fetchBoards: () =>{
            const result = [
                {
                    number: 1,
                    writer: '철수',
                    title: '제목입니다~~',
                    contents: '내용이에요@@@',
                },
                {
                    number: 2,
                    writer: '영희',
                    title: '영희 제목입니다~~',
                    contents: '영희 내용이에요@@@',
                },
                {
                    number: 3,
                    writer: '훈이',
                    title: '훈이 제목입니다~~',
                    contents: '훈이 내용이에요@@@',
                },
            ];

            return result;
        }
    },
    Mutation: {
        createBoard: (_, args)=>{
            console.log(args);
            console.log("------------------");
            console.log(args.createBoardInput.writer);
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    cors: true,
})

startStandaloneServer(server);