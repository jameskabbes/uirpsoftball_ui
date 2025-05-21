import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { paths, operations, components } from '../../openapi_schema';

interface ImageCard {
  imageIndex: number;
  timeout: ReturnType<typeof setTimeout>;
}

function calculateNCards(screenWidth: number): number {
  let cards: number;
  if (screenWidth < 600) {
    cards = 1;
  } else if (screenWidth < 1000) {
    cards = 2;
  } else {
    cards = 3;
  }
  return cards;
}

interface DataProps {
  images: components['schemas']['Image'][] | null;
}

interface Props {
  data: DataProps;
}

function GalleryRow({ data }: Props) {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [nextImageIndex, setNextImageIndex] = useState<number>(0);
  const [nCards, setNCards] = useState<number>(0);
  const [cards, setCards] = useState<ImageCard[]>([]);

  function handleResize() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (data !== null) {
      const newNCards = Math.min(
        calculateNCards(screenWidth),
        data.images.length
      );
      if (newNCards !== nCards) {
        resetCards(nCards, newNCards);
        setNCards(newNCards);
      }
    }
  }, [screenWidth, data]);

  function getTimeout(cardIndex: number) {
    const delay = Math.random() * 3 + 3;
    return setTimeout(() => {
      setNextImageIndex((prevNextImageIndex) => {
        setCards((prevCards) => {
          prevCards[cardIndex] = {
            imageIndex: prevNextImageIndex,
            timeout: getTimeout(cardIndex),
          };
          return prevCards;
        });
        return (prevNextImageIndex + 1) % data.images.length;
      });
      getTimeout;
    }, delay * 1000);
  }

  function resetCards(prevNCards: number, newNCards: number) {
    let tempCards = [...cards];
    if (prevNCards < newNCards) {
      let i: number;
      for (i = 0; i < newNCards - prevNCards; i++) {
        tempCards.push({
          imageIndex: nextImageIndex + i,
          timeout: getTimeout(prevNCards + i),
        });
      }
      setNextImageIndex((prev) => prev + i);
    }
    if (prevNCards > newNCards) {
      for (let i = 0; i < prevNCards - newNCards; i++) {
        clearTimeout(tempCards.pop().timeout);
      }
      setNextImageIndex(
        Math.max(...tempCards.map((card) => card.imageIndex)) + 1
      );
    }
    setCards(tempCards);
  }

  return (
    <>
      <div className="flex flex-row space-x-2 h-[300px] lg:h-[400px] justify-center">
        {(data === null
          ? Array.from({ length: calculateNCards(screenWidth) }, () => null)
          : cards
        ).map((card: null | ImageCard, index) => (
          <Card
            key={index}
            image={
              card === null
                ? null
                : data.images[card.imageIndex % data.images.length]
            }
          />
        ))}
      </div>
    </>
  );
}
export { GalleryRow };
