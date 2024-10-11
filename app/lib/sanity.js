import { createClient } from "next-sanity";

const client = createClient({
    projectId:process.env.NEXT_PUBLIC_SANITY_ID, 
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
})

export default client;