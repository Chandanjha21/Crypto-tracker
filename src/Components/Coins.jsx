import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import CoinCard from './CoinCard';
import Loader from './Loader';
import axios from 'axios';
import { server } from '..';
import ErrorMessage from './ErrorMessage';




const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
    }

  const btns = new Array(132).fill(1);



  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoins();

  }, [currency, page])

  if (error) return <ErrorMessage message={'Error while Fetching Coins'} />;


  return <Container maxW={'container.xl'} bgColor={'gray.100'} >
    {loading ? (<Loader />) : (
      <>

      <RadioGroup value={currency} onChange={setCurrency} p={'8'} >
        <HStack spacing={'4'} >
          <Radio value={"inr"} >INR</Radio>
          <Radio value={"usd"} >USD</Radio>
          <Radio value={"eur"} >EUR</Radio>
        </HStack>
      </RadioGroup>

        <HStack wrap={"wrap"} justifyContent={'space-evenly'} >
          {
            coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                symbol={i.symbol}
                name={i.name}
                price={i.current_price}
                img={i.image}
                currencySymbol={currencySymbol}
                bgColor={'blue'}
              />
            ))
          }
        </HStack>
        <HStack w={'full'} overflow={'scroll'} >
          {btns.map((item , index) =>(
             <Button
             key={index}
              bgColor={'blackAlpha.900'}
              color ={'white'}
              onClick={() => changePage(index + 1)}
               >
             {index + 1}
           </Button>
 
          ))}
         
        </HStack>
        
      </>
    )
    }

  </Container>
}





export default Coins