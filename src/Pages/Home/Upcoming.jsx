import React from 'react'
import { Container } from '../../components'
import peopleSitting from '../../assets/peopleSitting.png'
import rome from '../../assets/Rome.png'
import cabins from '../../assets/cabins.png'
import couple from '../../assets/couple.png'

const events = [
    {
        number: '01',
        location: 'Oaxaca, Mexico',
        date: 'March 12 - March 25',
        title: 'For mole, markets, and Monte Albán',
        img: peopleSitting
    },
    {
        number: '02',
        location: 'Rome, Italy',
        date: 'June 9 - June 30',
        title: 'Evening walks and neighborhood trattorias',
        img: rome
    },
    {
        number: '03',
        location: 'Lofoten, Norway',
        date: 'October 20 - October 28',
        title: 'Midnight sun, damp air, and drying cod',
        img: cabins
    },
    {
        number: '04',
        location: 'Kagoshima, Japan',
        date: 'Dec 3 - Dec 21',
        title: 'Admire Sakurajima from the ferry',
        img: couple
    },
]

function Upcoming() {
    return (
        <Container className={`bg-olive min-h-dvh relative`}>
            <div className='flex flex-col gap-5 text-cream font-jakrta'>
                <h1 className='text-two text-center mx-auto font-semibold leading-[120%] tracking-[-0.032rem]'>Upcoming itinerary</h1>
                <div className='flex flex-col '>
                    {events.map((event, index) => (

                        <div className={`flex justify-between border-t border-cream border-dashed  py-5  ${index === events.length - 1 ? 'border-b' : null}`}>
                            <div className='flex  items-center gap-5'>
                            <div className='font-xanhMono text-four_five font-normal leading-[120%] tracking-[-0.135rem] lg:text-six_five'>{event.number}</div>
                            <div className='flex flex-col '>
                                <h2 className='text-one-two_five lg:text-one_five font-medium leading-[120%] tracking-[-0.01rem] mb-1 lg:mb-4 '>{event.location}</h2>
                                <h2 className='text-one lg:text-one_two font-medium leading-[120%] tracking-[-0.02rem] '>{event.date}</h2>
                                <p className='text-one lg:text-one_two font-normal leading-[120%] tracking-[-0.02rem]'>{event.title}</p>
                            </div>
                            </div>
                            <div className={`overflow-hidden max-w-60 h-40 w-full  self-end bg-cover bg-center ${index % 2 == 0 ? 'rounded-xl' : null}`}
                            style={{backgroundImage : `url(${event.img})`}}>
                               
                            </div>
                        </div>




                    ))}

                </div>
            </div>

        </Container>
    )
}

export default Upcoming



