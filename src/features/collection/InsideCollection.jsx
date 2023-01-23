import React from 'react'
import { Box} from '@mui/material'
import { useGetCollectionByIdQuery } from './CollectionSlice'
import { useParams } from 'react-router-dom'

const InsideCollection = () => {
    const { id } = useParams()
    const { data = [] } = useGetCollectionByIdQuery(id)


    console.log(data)

    return (
        <Box>
            <h1>Inside Collection</h1>
        </Box>

//         {data.map((collection) => {
//             <Box key={collection._id}>
//                 <h2>{collection.title}</h2>
//                 <p>{collection.text}</p>
//                 <ul>
//                     {collection.wanted.map((item) => {
//                         <li key={item.id}>{item.title}</li>
//                     })}
//                 </ul>
//             </Box>
//                 }
//     ) 
// }
    )
}





export default InsideCollection

