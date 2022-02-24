import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: process.env.REACT_APP_PROJECT_ID,
    //projectId: '2jkaf3ps',
    dataset: "production"
})