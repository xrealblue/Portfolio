"use client";

import { EditProfileButton } from "@/components/write-message";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface DrawingCard {
  _id: string;
  name: string;
  message: string;
  image: string;
  createdAt: string;
}

export default function Page() {
  const [cards, setCards] = useState<DrawingCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<DrawingCard | null>(null);
  const [loading, setLoading] = useState(true);

  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get<any>("/messages");
      console.log("API Response:", response); // Debug log
      
      if (response.success && response.data) {
        // Backend returns { data: messages[], pagination: {...} }
        const messages = response.data.data || response.data;
        console.log("Messages:", messages); // Debug log
        setCards(Array.isArray(messages) ? messages : []);
      } else {
        console.log("No success or data:", response); // Debug log
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

  // Callback to refresh messages after sending
  const handleMessageSent = () => {
    getMessages();
  };

  const handleCardClick = (card: DrawingCard) => {
    setSelectedCard(card);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
  style={{
      padding:
            "clamp(1.5rem, 2.5vw, 240rem) clamp(0.75rem, 0.75vw, 240rem) clamp(1rem, 1vw, 240rem)",
  }}
    >
      <EditProfileButton onMessageSent={handleMessageSent} />
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-zinc-400">Loading messages...</p>
        </div>
      ) : cards.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-zinc-400">No messages yet</p>
        </div>
      ) : (
        <motion.div
          className="grid md:grid-cols-6 min-h-[80vh] grid-cols-2 py-20 pb-5 gap-4 px-4 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card._id}
              className="cursor-pointer"
              variants={cardVariants}
              onClick={() => handleCardClick(card)}
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
      )}

      {selectedCard && (
        <Dialog open={true} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-[480px] p-20 border-none h-full focus-visible:ring-0 outline-none">
            <X
              className="absolute top-4 text-muted-foreground/50 cursor-pointer hover:text-muted-foreground right-4"
              onClick={handleCloseDialog}
            />
            <DialogHeader className="h-0">
              <DialogTitle />
              <DialogDescription />
            </DialogHeader>
            <motion.div
              key={selectedCard._id}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-zinc-800 p-3 overflow-hidden">
                    <OptimizedImage
                      src={selectedCard.image}
                      className="aspect-square rounded-md"
                      alt="Drawing"
                      width={500}
                      height={500}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-3">
                  <motion.h3
                    className="text-zinc-400 text-sm font-mono"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedCard.name}
                  </motion.h3>
                  <motion.p
                    className="text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedCard.message}
                  </motion.p>
                </CardFooter>
              </Card>
              <motion.p
                className="text-muted-foreground/30 p-5 text-center text-sm font-mono"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {new Date(selectedCard.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </motion.p>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}