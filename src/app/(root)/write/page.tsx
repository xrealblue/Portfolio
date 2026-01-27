'use client'

import OptimizedImage from '@/components/OptimizedImage'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { EditProfileButton } from '@/components/write-message'
import api from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface DrawingCard {
  _id: string;
  message: string;
  canvas: CanvasPath[];
  name: string;
  image: string;
  del_image: string;
  createdAt: string;
}
const page = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<DrawingCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<DrawingCard | null>(null);
  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get<any>("/messages");
      if (response.success && response.data) {
        const messages = response.data.data || response.data;
        setCards(Array.isArray(messages) ? messages : []);
      } else {
        setCards([]);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div
      style={{
        padding: "clamp(0.5rem,1vw, 100rem)",
      }}
      className=''>
      <div className="flex gap-3">
        <Image src="/me.jpg" style={{
          filter: "grayscale(100%)",
        }} alt="profile" width={100} height={100}
          className='w-137'
        />

        <div className="flex flex-col gap-3">

          <p className="mb-4 md:w-[70%] align-text-bottom w-full leading-[1.35]">
            {
              " A full-stack developer who builds scalable applications people actually use. He loves creating creative frontends, while scaling backends. Passionate about real-world problems, I'm constantly exploring new ideas—whether it's for smoother user experience or user's enjoyment. I currently studying Computer Engineering at VGEC, Ahmedabad. If you have an interesting idea, please   "
            }{" "}
            <Link
              href="mailto:heetvavadiya099@gmail.com"
              className="hover:text-[#FDE037] hover:border-b hover:border-[#FDE037] border-dotted cursor-pointer"
            >
              get in touch↗.
            </Link>
          </p>
          <div
            style={{ padding: "clamp(0.5rem,0.5vw, 199rem) clamp(0.5rem,1vw, 199rem)" }}
            className="border w-fit border-white">
            <EditProfileButton />
          </div>
        </div>

      </div>



      <motion.div
        className="grid md:grid-cols-6 min-h-[80vh] grid-cols-2 py-20 pb-5 gap-4 px-4 mx-auto"
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card._id}
            className="cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-zinc-800 p-3 overflow-hidden">
                  <OptimizedImage
                    src={card.image}
                    className="aspect-square rounded-md"
                    alt={`Drawing ${index}`}
                    width={500}
                    height={500}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-3">
                <h3 className="text-zinc-400 text-sm w-32 truncate font-mono">
                  {card.name}
                </h3>
                <p className="text-white md:w-44 w-32 truncate">
                  {card.message}
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default page