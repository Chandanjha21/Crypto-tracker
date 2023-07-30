import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '..';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import Chart from './Chart';


const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [chartArray, setChartArray] = useState("inr");
  const [days, setDays] = useState("24h");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  
  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchCoin();

  }, [params.id ,currency,days]);

  if (error) return <ErrorMessage message={'Error while Fetching Coin Details'} />;

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };


  return (
    <Container maxW={'container.xl'} >
      {
        (loading) ? <Loader/> :(
          <>
          <Box w={'full'} >
            <Chart arr={chartArray} currency={currency} days={days} />
          </Box>

          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'} >
        <HStack spacing={'4'} >
          <Radio value={"inr"} >INR</Radio>
          <Radio value={"usd"} >USD</Radio>
          <Radio value={"eur"} >EUR</Radio>
        </HStack>
          </RadioGroup>

          <VStack spacing={'4'} p={'16'} justifyContent={'flex-start'} >
            <Text alignSelf={'center'} >
              Last updated on {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image src={coin.image.large} w={'16'} h={'16'}  objectFit={'contain'} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
              {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            

            <Badge 
            fontSize={'xl'}
            bgColor={'blackAlpha.300'}
            color={'white'}
             >
            {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
            high={` ${currencySymbol}${coin.market_data.high_24h[currency]}`} 
            low={` ${currencySymbol}${coin.market_data.low_24h[currency]}`} 
             />

            <Item title={"max supply"} value={coin.market_data.max_supply}  />
            <Item title={"circulating supply"} value={coin.market_data.circulating_supply}  />
            <Item title={"market cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}  />
            <Item title={"all time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}  />
            <Item title={"all time high"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}  />


          </VStack>

          </>
        )
      }
    </Container>
  )
}

const CustomBar = ({high,low}) => (
  <VStack w={'full'} >
    <Progress value={50} colorScheme={'teal'}  w={'full'} />
    <HStack>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'} >24hr Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)

const Item = ({title , value}) => (
  <HStack w={'full'} my={'1'} justifyContent={'space-between'} >
    <Text letterSpacing={'widest'} fontFamily={"Bebas Neue"} >
    {title}</Text>
    <Text>{value}</Text>
  </HStack>
)

export default CoinDetails