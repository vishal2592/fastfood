import React from 'react'
import Hero from '../Components/Hero'
import FoodCategories from '../Components/FoodCategories'
import BestSelling from '../Components/BestSelling'
import WhyChooseUs from '../Components/WhyChooseUs'
import TodaySpecial from '../Components/TodaySpecial'
import CustomerReview from '../Components/CustomerReview'
import DeliveryPartner from '../Components/DeliveryPartner'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div>
        <Hero />
        <FoodCategories />
        <BestSelling />
        <WhyChooseUs />
        <TodaySpecial />
        <CustomerReview />
        <DeliveryPartner />
        <NewsLetter />
    </div>
  )
}

export default Home