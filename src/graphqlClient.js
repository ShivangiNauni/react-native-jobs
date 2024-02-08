import {GraphQLClient} from 'graphql-request'

const url = "https://santacruzdelquiche.stepzen.net/api/lazy-toucan/__graphql";

const client  = new GraphQLClient(url,{
    headers:{
        Authorization:
        `apikey ${process.env.EXPO_PUBLIC_GRAPHQL_API_KEY}`,
    }
} );

export default client;