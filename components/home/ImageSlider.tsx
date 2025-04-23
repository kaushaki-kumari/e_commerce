import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  ScrollView, 
  Text
} from 'react-native';
import { FontAwesome6 } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

interface SlideItem {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  price: string;
  brands?: string[];
}

interface ImageSliderProps {
  slides: SlideItem[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideWidth = width - 40;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideWidth);
    setActiveIndex(activeIndex);
  };

  const goToSlide = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: (width - 40) * index, animated: true });
    }
  };

  const nextSlide = () => {
    if (activeIndex < slides.length - 1) {
      goToSlide(activeIndex + 1);
    } else {
      goToSlide(0); 
    }
  };

 
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <Image source={{ uri: slide.imageUrl }} style={styles.image} />
            <View style={styles.textOverlay}>
              {slide.brands && (
                <View style={styles.brandContainer}>
                  {slide.brands.map((brand, idx) => (
                    <View key={idx} style={styles.brandBadge}>
                      <Text style={styles.brandText}>{brand}</Text>
                    </View>
                  ))}
                </View>
              )}
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
              <Text style={styles.price}>{slide.price}</Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
              <FontAwesome6 name="chevron-right" size={16} color="#1B1650" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.paginationDot, 
              activeIndex === index ? styles.paginationDotActive : null
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollView: {
    width: width - 40,
  },
  slide: {
    width: width - 40,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 16,
    width: '100%',
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brandBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 6,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#404B63',
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    bottom: '8%',
    marginTop: -20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageSlider;