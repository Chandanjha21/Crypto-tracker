import React from 'react'
import {Button, HStack} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <HStack p={'4'} bgColor={'blackAlpha.900'} spacing={'5'} shadow={'base'} >
    <Button variant={"unstyled"}  color={'white'} >
    <Link to={'/'} >Home</Link>
    </Button>
    <Button variant={"unstyled"} color={'white'} >
    <Link to={'/coins'} >Coins</Link>
    </Button>
    <Button variant={"unstyled"} color={'white'} >
    <Link to={'/exchanges'} >Exchanges</Link>
    </Button>
   </HStack>
  )
}

export default Header