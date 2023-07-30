import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, Heading, Image, Text, VStack} from '@chakra-ui/react'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
//import { transform } from 'framer-motion'

const Exchanges = () => {
  const [exchanges , setExchanges] = useState([]);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(false);


  useEffect(() => {
    const fetchExchanges = async () =>{
    try {
      const{data} = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }    
    };

    fetchExchanges();
   
  }, [])

  if(error) 
      return <ErrorMessage message={'Error while Fetching exchanges'} />


  return <Container maxW={"container.xl"} >
    {loading ? (<Loader/>) : (
        <>
          <HStack wrap={"wrap"} >
            {
              exchanges.map((i) => (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  url={i.url}
                  img
                  ={i.image}
                  rank={i.trust_score_rank}
                />
              ))
            }
          </HStack>
        </>
     )
    }

  </Container>
}

const ExchangeCard = ({name ,rank , img ,url}) =>{
 return(
   <a href={url} target='blank' >

 <VStack  w={52} 
 shadow={'lg'}
  p={8}
  m={4}
  transition={"all 0.3s"}
  css={{
    "&:hover":{
      transform : "scale(1.1)",
     },
    }} >

  <Image src={img} w={10} h={10} objectFit={'contain' } alt='exchanges' />
  <Heading size={'md'} noOfLines={1} >{rank}</Heading>
  <Text noOfLines={1} >{name}</Text>

 </VStack>
</a>
)
}

export default Exchanges