import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, Image, TouchableOpacity, Animated } from 'react-native';

// Định nghĩa kiểu cho sản phẩm
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

// Định nghĩa kiểu cho thương hiệu
interface Brand {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  products: Product[];
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = new Animated.Value(0); // Dùng để theo dõi độ cuộn của trang

  // Dữ liệu ví dụ cho thương hiệu và sản phẩm
  const brands: Brand[] = [
    {
      id: '1',
      name: 'Thương hiệu 1',
      logo: './../../assets/images/5.jpg',
      coverImage: './../../assets/images/5.jpg',
      products: [
        { id: '1', name: 'Sản phẩm 1', image: './../../assets/images/1.png',price:450000 },
        { id: '2', name: 'Sản phẩm 2', image: './../../assets/images/2.jpg',price:650000 },
        { id: '3', name: 'Sản phẩm 3', image: './../../assets/images/1.png',price:670000 },
        { id: '4', name: 'Sản phẩm 4', image: './../../assets/images/3.jpg',price:450000 },
        { id: '5', name: 'Sản phẩm 5', image: './../../assets/images/4.jpg',price:250000 },
        { id: '6', name: 'Sản phẩm 6', image: './../../assets/images/1.png',price:340000 },
        { id: '7', name: 'Sản phẩm 7', image: './../../assets/images/5.jpg',price:450000 },
        { id: '8', name: 'Sản phẩm 8', image: './../../assets/images/1.png',price:450000 },
        { id: '9', name: 'Sản phẩm 9', image: './../../assets/images/4.jpg',price:350000 },
        { id: '10', name: 'Sản phẩm 10', image: './../../assets/images/3.jpg',price:450000 },
        { id: '11', name: 'Sản phẩm 11', image: './../../assets/images/3.jpg',price:300000 },
        { id: '12', name: 'Sản phẩm 12', image: './../../assets/images/5.jpg',price:400000 },
        
      ],
    },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    alert('Đăng ký thành công!');
    setShowRegister(false);
  };
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thay thế dấu phân cách hàng nghìn
    };
const renderProduct = ({ item }: { item: Product }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productPrice}>{formatPrice(item.price)} đ</Text> {/* Hiển thị giá */}
  </View>
);
const renderBrand = ({ item }: { item: Brand }) => (
  <View style={styles.brandContainer}>
    <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
    <View style={styles.brandHeader}>
      <Image source={{ uri: item.logo }} style={styles.brandLogo} />
      <Text style={styles.brandName}>{item.name}</Text>
    </View>
    <FlatList
      data={item.products}
      renderItem={renderProduct}
      keyExtractor={(product) => product.id}
      numColumns={2} // Hiển thị 2 sản phẩm mỗi hàng
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.productList}
    />
  </View>
);

const Header = () => {
  // Điều chỉnh kích thước và vị trí của header dựa trên cuộn
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [150, 80], // Kích thước thay đổi khi cuộn
    extrapolate: 'clamp',
  });

  const searchBarHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 0], // Chiều cao thanh tìm kiếm giảm dần khi cuộn
    extrapolate: 'clamp',
  });

  const headerFontSize = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [24, 18], // Giảm kích thước chữ khi cuộn
    extrapolate: 'clamp',
  });

  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 150], // Ẩn dần thanh tìm kiếm khi cuộn từ 0 đến 150
    outputRange: [1, 0], // Thanh tìm kiếm sẽ ẩn hoàn toàn khi cuộn tới 150
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      {/* Thanh tìm kiếm sẽ ẩn khi cuộn lên */}
      <Animated.View style={{ height: searchBarHeight, opacity: searchBarOpacity }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animated.View>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Giỏ Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Thông Báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Tài Khoản</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};


if (isLoggedIn) {
  return (
    <View style={styles.homepage}>
      <Header />
      <Animated.FlatList
        data={brands}
        renderItem={renderBrand}
        keyExtractor={(brand) => brand.id}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingTop: 50 }}
      />
    </View>
  );
}
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{showRegister ? 'Đăng Ký' : 'Đăng Nhập'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {showRegister ? (
        <Button title="Đăng Ký" onPress={handleRegister} />
      ) : (
        <Button title="Đăng Nhập" onPress={handleLogin} />
      )}
      <Text style={styles.toggleText}>
        {showRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
        <Text
          style={styles.link}
          onPress={() => setShowRegister(!showRegister)}
        >
          {showRegister ? 'Đăng Nhập' : 'Đăng Ký'}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  homepage: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  toggleText: {
    marginTop: 10,
    color: '#007BFF',
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  brandContainer: {
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  brandLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productList: {
    paddingTop: 10,
    justifyContent: 'space-between',
  },
productItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#FFFFF1',
    borderRadius: 8,
    alignItems: 'center',
    width: '48%', // Đặt width phù hợp với 2 sản phẩm trong mỗi hàng
    height: 220,
},
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  productPrice: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#000',
  textAlign: 'center',
},

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    overflow: 'hidden',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
