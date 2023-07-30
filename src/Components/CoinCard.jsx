import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({img , name , symbol , price ,id , currencySymbol="₹"}) => {
  return (
        
         
       <Link to={`/coin/${id}`} >
        <VStack  w={52} 
        borderRadius={'full'}
        bgColor={'white'}
        shadow={'lg'}
         p={8}
         m={4}
         transition={"all 0.3s"}
         css={{
           "&:hover":{
             transform : "scale(1.1)",
            },
           }} >
       
         <Image src={img} w={10} h={10} objectFit={'contain' } alt='coins' />
         <Heading size={'md'} noOfLines={1} >{symbol}</Heading>
         <Text noOfLines={1} >{name}</Text>
         <Text noOfLines={1} >{price? `${currencySymbol}${price}`:"N/A"}</Text>
       
        </VStack>
        </Link>
       )
  
}

export default CoinCard