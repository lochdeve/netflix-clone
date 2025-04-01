import { RefObject, useEffect, useRef, useState } from 'react';

interface UseCarouselOptions {
  /**
   * Porcentaje de desplazamiento al hacer clic en los botones de navegación
   * (como porcentaje del ancho visible del carrusel)
   */
  scrollPercentage?: number;
  /**
   * Multiplicador de velocidad para el arrastre
   */
  dragSpeed?: number;
  /**
   * Número mínimo de elementos para mostrar antes de considerar duplicarlos
   */
  minItems?: number;
  /**
   * Número de tarjetas a desplazarse por clic
   */
  cardsToScroll?: number;
}

interface UseCarouselReturn {
  carouselRef: RefObject<HTMLDivElement | null>;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scroll: (direction: 'left' | 'right') => void;
  scrollByCard: (direction: 'left' | 'right') => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleScroll: () => void;
  getDisplayItems: <T>(items: T[]) => T[];
  visibleCards: number;
}

/**
 * Hook personalizado para manejar la funcionalidad de un carrusel
 *
 * @param options Opciones de configuración del carrusel
 * @returns Objeto con propiedades y métodos para controlar el carrusel
 */
export function useCarousel({
  scrollPercentage = 0.75,
  dragSpeed = 1.5,
  minItems = 6,
  cardsToScroll = 1, // Por defecto, desplazarse 1 tarjeta a la vez
}: UseCarouselOptions = {}): UseCarouselReturn {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);

  // Función para calcular el número de tarjetas visibles
  const calculateVisibleCards = () => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards.length === 0) return;

    // Obtenemos el ancho total de una tarjeta (incluyendo márgenes)
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMarginLeft = parseFloat(cardStyle.marginLeft || '0');
    const cardMarginRight = parseFloat(cardStyle.marginRight || '0');
    const cardTotalWidth = cardWidth + cardMarginLeft + cardMarginRight;

    // Calculamos cuántas tarjetas completas caben en el viewport
    const containerWidth = container.clientWidth;
    const visibleCardsCount = Math.floor(containerWidth / cardTotalWidth);

    setVisibleCards(visibleCardsCount);
    return visibleCardsCount;
  };

  /**
   * Función utilitaria para duplicar elementos si no hay suficientes
   * para llenar el carrusel
   */
  function getDisplayItems<T>(items: T[]): T[] {
    if (!items || items.length === 0) return [];
    return items.length < minItems ? [...items, ...items] : items;
  }

  // Función para desplazar el carrusel
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * scrollPercentage;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Función para desplazar el carrusel un número fijo de cards
  const scrollByCard = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const cards = Array.from(container.children) as HTMLElement[];

    if (cards.length === 0) return;

    // Obtenemos el ancho y margen de cada tarjeta
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMarginLeft = parseFloat(cardStyle.marginLeft || '0');
    const cardMarginRight = parseFloat(cardStyle.marginRight || '0');
    const cardTotalWidth = cardWidth + cardMarginLeft + cardMarginRight;

    // Verificamos el número de tarjetas que deberíamos desplazar
    // Si no tenemos el valor calculado, lo calculamos ahora
    const actualVisibleCards = visibleCards || calculateVisibleCards() || 1;

    // Establecemos el número de tarjetas a desplazar (no más que las visibles)
    const actualCardsToScroll = Math.min(cardsToScroll, actualVisibleCards);

    // Calculamos la distancia de desplazamiento
    const scrollDistance = cardTotalWidth * actualCardsToScroll;

    // Aplicamos el desplazamiento
    if (direction === 'left') {
      // Para evitar scroll negativo en el extremo izquierdo
      const targetPosition = Math.max(0, container.scrollLeft - scrollDistance);
      container.scrollTo({ left: targetPosition, behavior: 'smooth' });
    } else {
      // Para ir a la derecha, avanzamos un número fijo de tarjetas
      // Calculamos la posición máxima de scroll para que la última tarjeta sea completamente visible
      const containerWidth = container.clientWidth;
      const totalContentWidth = container.scrollWidth;

      // Calculamos cuánto espacio queda hasta el final
      const remainingScroll =
        totalContentWidth - (container.scrollLeft + containerWidth);

      // Si queda menos de aproximadamente una tarjeta y media de scroll, vamos directamente al final
      if (remainingScroll <= cardTotalWidth * 1.5) {
        // Ir al final asegurando que se vean todas las tarjetas completas
        container.scrollTo({
          left: totalContentWidth - containerWidth,
          behavior: 'smooth',
        });
      } else {
        // Desplazamiento normal
        container.scrollTo({
          left: container.scrollLeft + scrollDistance,
          behavior: 'smooth',
        });
      }
    }
  };

  // Controlador para el inicio del arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  // Controlador para el movimiento del arrastre
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * dragSpeed;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Controlador para el final del arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Controlador para el desplazamiento del carrusel (actualizar visibilidad de flechas)
  const handleScroll = () => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    setShowLeftArrow(container.scrollLeft > 0);

    // Ajustamos la lógica para ocultar la flecha derecha solo cuando estamos muy cerca del final
    // Usamos un pequeño margen de error (10px) para manejar diferencias en redondeo de píxeles
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10;
    setShowRightArrow(!isAtEnd);
  };

  // Agregar/quitar event listeners y calcular tarjetas visibles
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // Calcular inicialmente cuántas tarjetas caben
    calculateVisibleCards();

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('mouseup', handleMouseUp);

    // Recalcular en cambio de tamaño y después de un breve retraso para asegurar que los tamaños se han estabilizado
    const handleResize = () => {
      handleScroll();
      calculateVisibleCards();
    };

    window.addEventListener('resize', handleResize);

    // Cálculo inicial después de que el DOM se haya renderizado completamente
    setTimeout(calculateVisibleCards, 100);

    // Verificación inicial de las flechas
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    carouselRef,
    showLeftArrow,
    showRightArrow,
    scroll,
    scrollByCard,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleScroll,
    getDisplayItems,
    visibleCards,
  };
}
